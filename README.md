# riot_template
Riot.jsを始める為のテンプレート


## ファイル

```
├── CHANGELOG.md
├── LICENSE
├── README.md
├── RiotFile.d.ts
├── dist 　　　　　　　・・・ ローカル開発時に生成
├── htdocs　　　　　　 ・・・ 本番ソースビルド時に生成
├── package.json
├── src　　　　　　    ・・・ 開発に使用するソース一式
│   ├── html         ・・・ htmlファイルを格納
│   ├── scripts      ・・・ tsファイルを格納
│   ├── riot         ・・・ riotを格納
│   └── styles       ・・・ scssファイルを格納
├── tsconfig.json
└── webpack.config.js
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
npm run build:dev
```

or 

```
yarn build:dev
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
npm run build:prod
```

or 

```
yarn build:prod
```