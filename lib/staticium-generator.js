// generator
"use strict";

// cache.json を読み込み (無ければ作成)
// temporaryフォルダを作成
// publicフォルダを作成
// pagesフォルダ内の.mdファイルを取得
  // cache.json に該当ファイルのhashがある場合、比較
    // ハッシュ値が同一ならスキップ
    // ハッシュ値が異なる場合
      // markdownファイルのyamlデータを取得
      // パス、タイトル、hash値を更新
  // cache.json に該当ファイルのhashがない場合、登録
    // markdownファイルのyamlデータを取得
    // パス、タイトル、hash値
  // 変換対象として保持する
// cache.json の内容を元にリンク一覧を生成
// 変換対象の各ファイルについて
  // markdownデータをhtmlに変換
  // ejsでhtml layoutに埋め込み
  // temporaryフォルダにフォルダパス作成
  // 作成したフォルダにhtmlを書き込み
// themes/{theme_name}/sourceの各ファイルについて
  // cache.json に該当ファイルのhashがある場合、比較
    // ハッシュ値が同一ならスキップ
    // ハッシュ値が異なる場合
      // hash値を更新
      // temporaryフォルダにフォルダパス作成
      // 対象ファイルをコピー
  // cache.json に該当ファイルのhashがない場合、登録
    // temporaryフォルダにフォルダパス作成
    // 対象ファイルをコピー
// temporaryの内容をpublicにコピー
