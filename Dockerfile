# 開発環境用の設定
FROM node:18-alpine

WORKDIR /app

# パッケージファイルをコピーして依存関係をインストール
COPY package*.json ./
RUN npm ci

# ソースコードをコピー
COPY . .

# 環境変数を設定
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]