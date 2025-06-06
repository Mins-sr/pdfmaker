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

