# pdfmaker

Simple Node.js web application to generate an order form PDF from an uploaded quotation PDF.

## 機能
- ブラウザから見積書 PDF をアップロードすると、簡易的な注文書 PDF を生成してダウンロードできます。
- 生成される注文書にはアップロードしたファイル名が記載されます。

## 実行環境の条件
- Node.js 16 以上で動作確認しています。
- `express`, `multer`, `pdfkit` の各 npm パッケージを利用します。

## インストール方法
```bash
npm install
```

## 使い方
1. サーバーを起動します。
   ```bash
   npm start
   ```
2. ブラウザで `http://localhost:3000` を開き、見積書 PDF を選択してアップロードします。
3. 自動的に注文書 PDF のダウンロードが開始されます。

## できること
- 単一ファイルのアップロードと注文書 PDF の自動生成。
- 生成した PDF はサーバー側に保存されず、レスポンスとして直接返されます。

## できないこと
- アップロードした PDF の内容を解析してレイアウトを調整することはできません。
- 複数ファイルの同時アップロードや細かなレイアウト変更など、高度な PDF 処理は行えません。


## AWS Lambda で公開する方法
AWS アカウントを作成済みであることを前提に、Express アプリを Lambda 上で動かす手順を示します。

1. 必要なモジュールを追加します。
   ```bash
   npm install serverless-http
   ```
2. `server.js` の Express アプリをモジュール化し、Lambda 用のハンドラーを作成します。例として `lambda.js` を以下のように用意します。
   ```javascript
   const serverless = require('serverless-http');
   const app = require('./server');
   module.exports.handler = serverless(app);
   ```
3. すべてのファイルと `node_modules` を含めて zip 圧縮し、Lambda 関数としてアップロードします。
4. AWS コンソールで Node.js 16 以降のランタイムを選び、ハンドラーに `lambda.handler` を指定します。
 5. API Gateway で HTTP API を作成し、この Lambda 関数を統合します。デプロイ後に発行される URL からアプリを利用できます。

## CLI からデプロイする例
AWS CLI が未インストールの環境を想定し、git clone 直後から Lambda 作成までの流れをコマンドベースで示します。

1. リポジトリを取得して依存パッケージを導入します。
   ```bash
   git clone <repository-url>
   cd pdfmaker
   npm install
   npm install serverless-http
   ```
2. 上記の手順を参考に `lambda.js` を用意します。
3. AWS CLI をインストールして設定します (Linux の例)。
   ```bash
   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
   unzip awscliv2.zip
   sudo ./aws/install
   aws --version
   aws configure
   ```
4. アプリを zip 化し、Lambda 関数を作成します。
   ```bash
   zip -r function.zip . -x '*.git*'
   aws lambda create-function \
       --function-name pdfmaker \
       --runtime nodejs16.x \
       --handler lambda.handler \
       --zip-file fileb://function.zip \
       --role arn:aws:iam::<account-id>:role/<role>
   ```
5. API Gateway で HTTP API を作成し、この関数を統合すると公開 URL が取得できます。

