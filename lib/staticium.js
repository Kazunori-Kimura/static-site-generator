/*
   staticium
   static site generator
 */
"use strict";
const ejs = require("ejs");
const fs = require("fs-extra-promise");
const co = require("co");
const glob = require("glob");
const path = require("path");
const yaml = require("yaml-front-matter");
const mp = require("./markdown-parser");
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
      const layoutFolder = path.resolve(site_path, "themes/default/layouts");
      const layoutFile = path.resolve(layoutFolder, "index.ejs");
      const layout = yield fs.readFileAsync(layoutFile, { encoding: "utf-8" });

      // glob
      const cwd = path.resolve(site_path, "pages");
      const files = yield globAsync("**/*.md", { cwd });

      // 取得したmarkdown を html に変換
      const public_dir = path.resolve(site_path, "public");
      for (let i=0; i<files.length; i++) {
        // markdown読み込み
        const data = yield fs.readFileAsync(path.resolve(cwd, files[i]), { encoding: "utf-8"});
        // 変換処理
        const page = mp.render(data, site, layout, layoutFolder);

        if (page) {
          // ファイル出力先
          const file_path = path.resolve(public_dir, files[i]).replace(/\.md$/, ".html");
          // ファイル出力
          yield fs.outputFileAsync(file_path, page, { encoding: "utf-8" });

          logger.trace(`${file_path} created.`);
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
