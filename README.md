# static-site-generator

static site generator

## コマンド

* ssgen init <site_name>
* ssgen generate [--debug]

## フォルダ構成

* <site_name>
  - pages
  - themes
  - config.yml
  - public

## 機能概要

* pages 配下の markdown ファイルを全取得し、そのままのフォルダ構成で html に変換し
  public フォルダに配置します。

* html に変換する際、 themes/layouts に格納されたレイアウトファイルに
  変換したコンテンツを埋め込みます。
  - {% content %} に埋め込み

* themes/source 以下の js, cssなどのフォルダ・ファイルは
  そのまま public 直下にコピーされます。

* 変換結果を <site_name>/cache.json に残す
  sha256の値を保持
  cacheの値と異なればファイルを生成

```js
{
  config: "xxx",
  pages: {
    filepath: "xxx", ...
  },
  theme: {
    filepath: "xxx", ...
  }
}
```

## memo

* [fs-extra](http://qiita.com/okaxaki/items/981633485594baf622b0) を使う
* [js-yaml](https://github.com/nodeca/js-yaml) を使う
  - [使い方](http://dev.classmethod.jp/client-side/javascript/node-yaml/)

* http-serverを使う
