# Tasks: LINE LIFF 予約システム

**Input**: 設計ドキュメント `/specs/001-line-liff-next/`
**Prerequisites**: plan.md (必須), research.md, data-model.md, contracts/

## 実行フロー (main)
```
1. フィーチャーディレクトリからplan.mdをロード
   → 見つからない場合: エラー "実装計画が見つかりません"
   → 抽出: 技術スタック、ライブラリ、構造
2. オプション設計ドキュメントをロード:
   → data-model.md: エンティティを抽出 → モデルタスク
   → contracts/: 各ファイル → 契約テストタスク
   → research.md: 決定事項を抽出 → セットアップタスク
3. カテゴリ別にタスクを生成:
   → セットアップ: プロジェクト初期化、依存関係、リンティング
   → テスト: 契約テスト、統合テスト
   → コア: モデル、サービス、APIエンドポイント
   → 統合: DB、ミドルウェア、ロギング
   → 仕上げ: 単体テスト、パフォーマンス、ドキュメント
4. タスクルールを適用:
   → 異なるファイル = 並列実行[P]マーク
   → 同じファイル = 順次実行（[P]なし）
   → 実装前にテスト（TDD）
5. タスクを順次番号付け（T001、T002...）
6. 依存関係グラフを生成
7. 並列実行例を作成
8. タスク完全性を検証:
   → すべての契約にテストがある？
   → すべてのエンティティにモデルがある？
   → すべてのエンドポイントが実装されている？
9. 戻り値: 成功（タスク実行準備完了）
```

## 形式: `[ID] [P?] 説明`
- **[P]**: 並列実行可能（異なるファイル、依存関係なし）
- 説明には正確なファイルパスを含める

## パス規約
Next.js Webアプリケーション構造に基づく:
- **フロントエンド**: `pages/`, `components/`, `hooks/`
- **バックエンド**: `pages/api/`, `lib/`, `prisma/`
- **テスト**: `__tests__/`, `tests/`

## フェーズ 3.1: セットアップ
- [ ] T001 Next.js + TypeScript + LIFF プロジェクト構造の確認・初期化
- [ ] T002 Prisma + PostgreSQL データベース依存関係の設定
- [ ] T003 [P] ESLint、Prettier、Tailwind CSS設定
- [ ] T004 [P] Jest + Testing Library + Playwright テスト環境設定

## フェーズ 3.2: テストファースト (TDD) ⚠️ 3.3前に必須完了
**重要: これらのテストは実装前に作成し、失敗する必要があります**

### 契約テスト (並列実行可能)
- [ ] T005 [P] GET /api/services 契約テスト in `__tests__/api/services.test.ts`
- [ ] T006 [P] GET /api/services/{serviceId}/timeslots 契約テスト in `__tests__/api/timeslots.test.ts`
- [ ] T007 [P] POST /api/reservations 契約テスト in `__tests__/api/reservations-post.test.ts`
- [ ] T008 [P] GET /api/reservations 契約テスト in `__tests__/api/reservations-get.test.ts`
- [ ] T009 [P] PATCH /api/reservations/{id} 契約テスト in `__tests__/api/reservations-patch.test.ts`

### データモデルテスト (並列実行可能)
- [ ] T010 [P] User モデル検証テスト in `__tests__/models/user.test.ts`
- [ ] T011 [P] Service モデル検証テスト in `__tests__/models/service.test.ts`
- [ ] T012 [P] TimeSlot モデル検証テスト in `__tests__/models/timeslot.test.ts`
- [ ] T013 [P] Reservation モデル検証テスト in `__tests__/models/reservation.test.ts`

### 統合テスト (並列実行可能)
- [ ] T014 [P] ヒーリングサービス予約フロー統合テスト in `__tests__/integration/booking-flow.test.ts`
- [ ] T015 [P] 予約キャンセルフロー統合テスト in `__tests__/integration/cancellation-flow.test.ts`
- [ ] T016 [P] ダブルブッキング防止統合テスト in `__tests__/integration/double-booking.test.ts`
- [ ] T017 [P] LINE認証統合テスト in `__tests__/integration/line-auth.test.ts`
- [ ] T018 [P] LINE通知統合テスト in `__tests__/integration/line-notifications.test.ts`

## フェーズ 3.3: コア実装 (テスト失敗後のみ)

### データベーススキーマ
- [ ] T019 Prisma スキーマ定義 in `prisma/schema.prisma`
- [ ] T020 初期データベースマイグレーション実行

### データモデル (並列実行可能)
- [ ] T021 [P] User モデル in `lib/models/user.ts`
- [ ] T022 [P] Service モデル in `lib/models/service.ts`
- [ ] T023 [P] TimeSlot モデル in `lib/models/timeslot.ts`
- [ ] T024 [P] Reservation モデル in `lib/models/reservation.ts`

### サービス層 (並列実行可能)
- [ ] T025 [P] UserService CRUD operations in `lib/services/userService.ts`
- [ ] T026 [P] ServiceService CRUD operations in `lib/services/serviceService.ts`
- [ ] T027 [P] TimeSlotService availability logic in `lib/services/timeSlotService.ts`
- [ ] T028 [P] ReservationService booking logic in `lib/services/reservationService.ts`

### API エンドポイント
- [ ] T029 GET /api/services エンドポイント in `pages/api/services/index.ts`
- [ ] T030 GET /api/services/[serviceId]/timeslots エンドポイント in `pages/api/services/[serviceId]/timeslots.ts`
- [ ] T031 POST /api/reservations エンドポイント in `pages/api/reservations/index.ts`
- [ ] T032 GET /api/reservations ユーザー予約取得 in `pages/api/reservations/index.ts`
- [ ] T033 PATCH /api/reservations/[id] 予約更新 in `pages/api/reservations/[id].ts`

### LINE LIFF統合
- [ ] T034 [P] LIFF初期化フック in `hooks/useLiff.ts`
- [ ] T035 [P] LINE認証ヘルパー in `lib/auth/lineAuth.ts`
- [ ] T036 [P] LINEメッセージング統合 in `lib/integrations/lineMessaging.ts`

## フェーズ 3.4: フロントエンド実装

### 共通コンポーネント (並列実行可能)
- [ ] T037 [P] Layout コンポーネント in `components/Layout.tsx`
- [ ] T038 [P] LoadingSpinner コンポーネント in `components/LoadingSpinner.tsx`
- [ ] T039 [P] ErrorMessage コンポーネント in `components/ErrorMessage.tsx`

### 予約システムコンポーネント (並列実行可能)
- [ ] T040 [P] ServiceList コンポーネント in `components/ServiceList.tsx`
- [ ] T041 [P] ServiceCard コンポーネント in `components/ServiceCard.tsx`
- [ ] T042 [P] TimeSlotPicker コンポーネント in `components/TimeSlotPicker.tsx`
- [ ] T043 [P] BookingForm コンポーネント in `components/BookingForm.tsx`
- [ ] T044 [P] ReservationList コンポーネント in `components/ReservationList.tsx`
- [ ] T045 [P] ReservationCard コンポーネント in `components/ReservationCard.tsx`

### ページ実装
- [ ] T046 /reservation メイン予約ページ in `pages/reservation.tsx`
- [ ] T047 予約確認ページ in `pages/confirmation/[id].tsx`
- [ ] T048 マイ予約ページ in `pages/my-reservations.tsx`

### 状態管理とAPI連携
- [ ] T049 [P] サービス取得カスタムフック in `hooks/useServices.ts`
- [ ] T050 [P] 時間枠取得カスタムフック in `hooks/useTimeSlots.ts`
- [ ] T051 [P] 予約管理カスタムフック in `hooks/useReservations.ts`

## フェーズ 3.5: 統合・ミドルウェア
- [ ] T052 LINE認証ミドルウェア in `lib/middleware/auth.ts`
- [ ] T053 エラーハンドリングミドルウェア in `lib/middleware/errorHandler.ts`
- [ ] T054 リクエストログミドルウェア in `lib/middleware/logger.ts`
- [ ] T055 レート制限ミドルウェア in `lib/middleware/rateLimit.ts`

## フェーズ 3.6: データシーディング・初期化
- [ ] T056 ヒーリングサービス初期データ in `prisma/seed.ts`
- [ ] T057 [P] 開発環境時間枠生成スクリプト in `scripts/generateTimeSlots.ts`

## フェーズ 3.7: 仕上げ・最適化

### 単体テスト (並列実行可能)
- [ ] T058 [P] サービス料金計算単体テスト in `__tests__/unit/pricing.test.ts`
- [ ] T059 [P] 日時検証単体テスト in `__tests__/unit/dateValidation.test.ts`
- [ ] T060 [P] 予約ステータス遷移単体テスト in `__tests__/unit/statusTransition.test.ts`

### E2Eテスト
- [ ] T061 [P] 予約完全フローE2Eテスト in `tests/e2e/booking-flow.spec.ts`
- [ ] T062 [P] キャンセルフローE2Eテスト in `tests/e2e/cancellation-flow.spec.ts`

### パフォーマンス・セキュリティ
- [ ] T063 APIレスポンス時間最適化（<300ms目標）
- [ ] T064 [P] セキュリティヘッダー設定 in `next.config.js`
- [ ] T065 [P] 環境変数設定ドキュメント in `README.md`

### ドキュメント・検証
- [ ] T066 [P] API仕様書更新 in `docs/api.md`
- [ ] T067 クイックスタート検証実行 - 全5シナリオテスト

## 依存関係
- セットアップ (T001-T004) → すべての他のタスク
- テスト (T005-T018) → 対応する実装タスク
- データベース (T019-T020) → データモデル (T021-T024)
- データモデル (T021-T024) → サービス層 (T025-T028)
- サービス層 (T025-T028) → API (T029-T033)
- LIFF統合 (T034-T036) → フロントエンド (T037-T051)
- コア実装 → 統合・ミドルウェア (T052-T055)
- すべての実装 → 仕上げ (T058-T067)

## 並列実行例

### テスト作成フェーズ (5つの契約テストを並列実行)
```
Task: "GET /api/services 契約テスト in __tests__/api/services.test.ts"
Task: "GET /api/services/{serviceId}/timeslots 契約テスト in __tests__/api/timeslots.test.ts"  
Task: "POST /api/reservations 契約テスト in __tests__/api/reservations-post.test.ts"
Task: "GET /api/reservations 契約テスト in __tests__/api/reservations-get.test.ts"
Task: "PATCH /api/reservations/{id} 契約テスト in __tests__/api/reservations-patch.test.ts"
```

### データモデル実装フェーズ (4つのモデルを並列実行)
```
Task: "User モデル in lib/models/user.ts"
Task: "Service モデル in lib/models/service.ts"
Task: "TimeSlot モデル in lib/models/timeslot.ts"
Task: "Reservation モデル in lib/models/reservation.ts"
```

### フロントエンドコンポーネント作成フェーズ (6つのコンポーネントを並列実行)
```
Task: "ServiceList コンポーネント in components/ServiceList.tsx"
Task: "ServiceCard コンポーネント in components/ServiceCard.tsx"
Task: "TimeSlotPicker コンポーネント in components/TimeSlotPicker.tsx"
Task: "BookingForm コンポーネント in components/BookingForm.tsx"
Task: "ReservationList コンポーネント in components/ReservationList.tsx"
Task: "ReservationCard コンポーネント in components/ReservationCard.tsx"
```

## 注意事項
- [P] タスク = 異なるファイル、依存関係なし
- 実装前にテストが失敗することを確認
- 各タスク後にコミット
- 避ける: 曖昧なタスク、同一ファイル競合

## タスク生成ルール
*main()実行中に適用*

1. **契約から**:
   - 各契約ファイル → 契約テストタスク [P]
   - 各エンドポイント → 実装タスク

2. **データモデルから**:
   - 各エンティティ → モデル作成タスク [P]
   - 関係性 → サービス層タスク

3. **ユーザーストーリーから**:
   - 各ストーリー → 統合テスト [P]
   - クイックスタートシナリオ → 検証タスク

4. **順序**:
   - セットアップ → テスト → モデル → サービス → エンドポイント → 仕上げ
   - 依存関係により並列実行をブロック

## 検証チェックリスト
*SUCCESS返却前にmain()でチェック*

- [x] すべての契約に対応するテストがある
- [x] すべてのエンティティにモデルタスクがある  
- [x] すべてのテストが実装前に配置されている
- [x] 並列タスクが真に独立している
- [x] 各タスクに正確なファイルパスが指定されている
- [x] [P]タスクが同じファイルを変更していない

## ヒーリングサービス固有の注意事項

### サービス料金体系
- **アクセスバース**: 30分(3800円), 60分(6300円), 90分(8800円)
- **霊視オラクルリーディング**: 30分(3000円), 60分(5000円)  
- **エネルギークリアリング**: 基本料金+1000円

### LINE LIFF制約
- モバイルファーストデザイン必須
- LINE認証トークン検証
- LINEメッセージング API通知

### パフォーマンス目標
- APIレスポンス < 300ms
- 1000同時ユーザー対応
- 日単位100-500予約処理