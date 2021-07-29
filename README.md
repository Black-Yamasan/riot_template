# riot_template
Riot.jsを始める為のテンプレート


## バージョン

### ver. 1.0.0

- 基本的なテンプレートセット

### ver. 1.0.1

- gulpのバージョンをアップデート・ビルドコマンド変更

### ver. 2.0.0

- ほぼ全てのパッケージのバージョンアップデート

### ver. 2.0.1

- IE11に対応

### ver. 2.0.2

- パッケージのバージョンアップデート

### ver. 3.0.0

- パッケージのバージョンアップデート
  - Riot.jsのバージョンを5系にアップデート
- IE11対応用のPolyfill削除
- `.js` と `.riot` を `@/hogehoge` で参照出来るように設定
- Node.jsとnpmのバージョンを指定


### ver. 3.0.01

- webpackのバージョンアップデート

## ファイル

```
├── LICENSE
├── README.md
├── babel.config.js
├── dist 　　　　　　　・・・ ローカル開発時に生成
├── gulpfile.js
├── htdocs　　　　　　 ・・・ 本番ソースビルド時に生成
├── package.json
├── src　　　　　　    ・・・ 開発に使用するソース一式
│   ├── html         ・・・ htmlファイルを格納
│   ├── images       ・・・ 画像ファイルを格納
│   ├── js           ・・・ jsファイルを格納
│   ├── riot         ・・・ riotを格納
│   └── styles       ・・・ scssファイルを格納
├── webpack.config.js
└── yarn.lock
```


## 使い方

#### インストール

```
npm i
```

or 

```
yarn
```


#### ローカル開発用ビルド

```
npm run dev
```

or 

```
yarn dev
```


#### ブラウザ起動

```
npm run start
```

or 

```
yarn start
```


#### 本番環境用ソースビルド

```
npm run prod
```

or 

```
yarn prod
```