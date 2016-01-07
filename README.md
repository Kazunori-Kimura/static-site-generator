# static-site-generator

static site generator

## コマンド

* ssgen init <site_name>
* ssgen generate

## フォルダ構成

* <site_name>
  - pages
  - themes
  - config.json
  - public

## 機能概要

* pages 配下の markdown ファイルを全取得し、そのままのフォルダ構成で html に変換し
  public フォルダに配置します。

* html に変換する際、 themes/layouts に格納されたレイアウトファイルに
  変換したコンテンツを埋め込みます。
  - {% content %} に埋め込み

* themes/source 以下の js, cssなどのフォルダ・ファイルは
  そのまま public 直下にコピーされます。
