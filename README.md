# riot_template
Riot.jsを始める為のテンプレート


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