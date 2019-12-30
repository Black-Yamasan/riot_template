# riot_template
Riot.jsを始める為のテンプレート


## バージョン

### ver. 1.0.0
基本的なテンプレートセット

### ver. 1.0.1
gulpのバージョンをアップデート・ビルドコマンド変更

### ver. 2.0.0
ほぼ全てのパッケージのバージョンアップデート

### 使い方と仕様


#### ＜使い方＞
  1. nodeをインストール
  2. 作業ディレクトリに移動し、コマンド「npm install」で必要なパッケージをインストール
  3. 開発用ソースのビルド  `npm run dev`
  4. コマンド `npm run start` でローカルサーバー起動
  5. 開発が終わったら本番環境用にソースをビルド
  - htdocs/を一旦空にする `gulp clean`
  - 本番環境用のソースをビルド `npm run prod`  
  ＊ htdocs/以下にminifyしたcssやjsが入ります。

#### ＜仕様＞
  * /src/以下のファイルを上書き保存すると、自動ビルドとブラウザリロードが始まります。  
  ＊処理が重い場合やPCのスペック・メモリの都合でリロードしても変更が反映しきれない場合があります。  
  その場合には手動でブラウザをリロードして下さい。  
  * /src/以下のファイルを編集すると、/src/と同じ階層に「/dist/」フォルダが自動的に生成されます。  
  * 画像ファイルは/src/images/内で管理。  
  ＊ サーバーにアップロードするのは/htdocs/内のファイルのみ。
