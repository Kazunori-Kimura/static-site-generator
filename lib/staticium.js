/*
   staticium
   static site generator
 */
"use strict";
const path = require("path");
const fs = require("fs-extra-promise");
const co = require("co");
const glob = require("glob");
const yaml = require("yaml-front-matter");
const mp = require("./markdown-parser");
const checksum = require("./checksum");
const logger = require("./logger");

class Staticium {
  constructor() {
    // debugログ出力
    this.isDebug = true;
    logger.setDebug(this.isDebug);
  }

  /**
   * initコマンドで呼ばれる処理
   */
  init() {
    logger.trace("init");
    // カレントディレクトリに指定されたフォルダを作成

    // 作成したフォルダにカレントディレクトリを移動

    // template の内容をコピー

  }

  generate() {
    logger.trace("generate");
  }

  // ファイルを削除した場合はclearコマンドを実行する
  clear() {
    logger.trace("clear");
    // temporaryフォルダの内容を削除
    // publicフォルダの内容を削除
    // cache.jsonを削除
  }

  test_load(site_path) {
    co(function *(){
      // site設定読み込み
      const siteYaml = yield fs.readFileAsync(path.resolve(site_path, "config.yml"), { encoding: "utf-8" });
      const site = yaml.safeLoad(siteYaml);

      // layout
      const layoutFolder = path.resolve(site_path, `themes/${site.theme}/layouts`);
      const layoutFile = path.resolve(layoutFolder, "index.ejs");
      const layout = yield fs.readFileAsync(layoutFile, { encoding: "utf-8" });

      // glob
      const cwd = path.resolve(site_path, "pages");
      const files = yield globAsync("**/*", { cwd });

      // 公開フォルダ
      const public_dir = path.resolve(site_path, "public");
      for (let i=0; i<files.length; i++) {
        // コピー元
        const srcPath = path.resolve(cwd, files[i]);
        // コピー先
        let distPath = path.resolve(public_dir, files[i]);

        // markdownファイルかどうか？
        if (/\.md$/.test(files[i])) {
          // markdown読み込み
          const data = yield fs.readFileAsync(srcPath, { encoding: "utf-8"});
          // 変換処理
          const page = mp.render(data, site, layout, layoutFolder);
          // ファイル出力先
          const html = files[i].replace(/\.md$/, ".html");
          distPath = path.resolve(public_dir, html);
          // ファイル出力
          yield fs.outputFileAsync(distPath, page, { encoding: "utf-8" });

          logger.trace(`${file_path} created.`);
        } else {
          // markdown以外はそのままコピー
          yield fs.copyAsync(srcPath, distPath);

          logger.trace(`${distPath} copied.`);
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }
}

/**
 * globをPromiseで包む
 */
function globAsync(pattern, options) {
  return new Promise((resolve, reject) => {
    glob(pattern, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

module.exports = Staticium;

/*

cache: {
  sources: {
    filepath: {
      path: {string},
      hash: {string}
    }
  },
  files: [
    {
      url: {string},
      title: {string},
      created: {string},
      updated: {string},
      hash: {string}
    }
  ]
}

*/
