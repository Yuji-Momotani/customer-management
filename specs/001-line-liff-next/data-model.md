# データモデル: LINE LIFF 予約システム

**日付**: 2025-09-22  
**機能**: LINE LIFF 予約システム

## 中核エンティティ

### User（ユーザー）
予約を行うLINEユーザーを表す

**フィールド**:
- `id`: UUID (主キー)
- `lineUserId`: String (ユニーク、LINEプロフィールから)
- `displayName`: String (LINEプロフィールから)
- `pictureUrl`: String (オプション、LINEプロフィールから)
- `email`: String (オプション、通知用)
- `phone`: String (オプション、連絡用)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**関係性**:
- Reservationと一対多の関係

**検証ルール**:
- lineUserIdはユニークで非NULL必須
- displayNameは空でない必須

### Service（サービス）
予約可能なサービス/予約タイプを表す

**フィールド**:
- `id`: UUID (主キー)
- `name`: String (例：「アクセスバース」、「霊視オラクルリーディング」、「エネルギークリアリング」)
- `description`: Text (オプション)
- `duration`: Integer (分単位)
- `price`: Decimal (オプション)
- `maxCapacity`: Integer (デフォルト: 1)
- `advanceBookingHours`: Integer (最低何時間前に予約必要)
- `cancellationHours`: Integer (何時間前までキャンセル可能)
- `isActive`: Boolean (デフォルト: true)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**関係性**:
- TimeSlotと一対多の関係
- Reservationと一対多の関係

**検証ルール**:
- nameは空でない必須
- durationは正の値必須
- maxCapacityは正の値必須
- advanceBookingHoursは非負値必須

### TimeSlot（時間枠）
利用可能な予約期間を表す

**フィールド**:
- `id`: UUID (主キー)
- `serviceId`: UUID (Serviceへの外部キー)
- `startTime`: DateTime
- `endTime`: DateTime
- `isAvailable`: Boolean (デフォルト: true)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**関係性**:
- Serviceと多対一の関係
- Reservationと一対多の関係

**検証ルール**:
- startTimeはendTimeより前である必要がある
- endTime - startTimeはservice.durationと等しい必要がある
- startTimeは未来の時刻である必要がある

**状態遷移**:
- 利用可能 → 予約済み（予約作成時）
- 予約済み → 利用可能（予約キャンセル時）

### Reservation（予約）
ユーザーが行った予約を表す

**フィールド**:
- `id`: UUID (主キー)
- `userId`: UUID (Userへの外部キー)
- `serviceId`: UUID (Serviceへの外部キー)
- `timeSlotId`: UUID (TimeSlotへの外部キー)
- `bookingReference`: String (ユニーク、自動生成)
- `status`: Enum (PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW)
- `customerName`: String
- `customerPhone`: String (オプション)
- `customerEmail`: String (オプション)
- `notes`: Text (オプション)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `confirmedAt`: DateTime (オプション)
- `cancelledAt`: DateTime (オプション)

**関係性**:
- Userと多対一の関係
- Serviceと多対一の関係
- TimeSlotと多対一の関係

**検証ルール**:
- bookingReferenceはユニークで自動生成必須
- customerNameは空でない必須
- status遷移は許可されたフローに従う必要がある

**状態遷移**:
```
PENDING → CONFIRMED (支払い/確認)
PENDING → CANCELLED (ユーザーキャンセル)
CONFIRMED → CANCELLED (ポリシー内でのキャンセル)
CONFIRMED → COMPLETED (サービス完了後)
CONFIRMED → NO_SHOW (ユーザーが現れない場合)
```

## データベースインデックス

**パフォーマンス重要クエリ**:
1. 日付範囲内でのサービスの利用可能時間枠を検索
2. ユーザーの予約を取得
3. 予約参照番号による予約検索

**推奨インデックス**:
- `TimeSlot(serviceId, startTime, isAvailable)` - 空き状況クエリ用複合インデックス
- `Reservation(userId, status)` - ユーザー予約検索用
- `Reservation(bookingReference)` - 参照番号検索用ユニークインデックス
- `Reservation(timeSlotId)` - 外部キーインデックス

## データ整合性ルール

1. **ダブルブッキング防止**: 1つのTimeSlotに対してCONFIRMED/PENDING予約は最大1つまで
2. **定員制限**: 時間枠あたりの予約数がservice.maxCapacityを超えてはならない
3. **事前予約**: 予約はstartTimeのservice.advanceBookingHours時間前より早く作成できない
4. **キャンセルポリシー**: 予約はstartTimeのservice.cancellationHours時間前より遅くキャンセルできない

## サンプルデータフロー

1. **サービス作成**: 管理者が「アクセスバース」サービス（30分:3800円、60分:6300円、90分:8800円）を作成
2. **時間枠生成**: システムが営業時間に基づいて日次時間枠を生成
3. **ユーザー予約**: ユーザーが利用可能な枠を選択し、PENDING予約を作成
4. **確認**: システムが予約を確認し、ステータスをCONFIRMEDに変更、LINE通知を送信
5. **キャンセル**: ユーザーが予約をキャンセルし、ステータスがCANCELLEDに変更、時間枠が再び利用可能になる

## データベース設計考慮事項

### 拡張性
- UUIDの使用により分散システムでの一意性を保証
- 時間枠テーブルの分割を考慮（月別または年別）
- 予約履歴の長期保存戦略

### パフォーマンス
- 頻繁にアクセスされる時間枠クエリの最適化
- 適切なインデックス戦略
- キャッシュ戦略（利用可能時間枠など）

### セキュリティ
- 個人情報の適切な暗号化
- アクセス制御の実装
- 監査ログの記録

### 国際化
- 時間帯の適切な処理
- 多言語対応のためのlocaleフィールド検討
- 通貨と価格の地域対応

## マイグレーション戦略

1. **初期スキーマ**: 基本エンティティの作成
2. **インデックス追加**: パフォーマンス最適化
3. **制約追加**: データ整合性ルールの強化
4. **拡張フィールド**: 将来の機能拡張に備えたフィールド追加

## 関連ファイル

- `contracts/api.yaml` - API仕様でのデータ構造定義
- `quickstart.md` - データモデルを使用したテストシナリオ
- `research.md` - データベース選択の根拠