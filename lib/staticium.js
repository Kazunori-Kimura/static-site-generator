/*
   staticium
   static site generator
 */
"use strict";

const ejs = require("ejs");
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const yaml = require("yaml-front-matter");
const parser = require("./markdown-parser");
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

  test() {
    logger.debug("hoge");
    logger.info("foo");
    logger.error("bar");
  }

  // config.yml読み込み動作確認
  test_config() {
    const file = "template/config.yml";
    const yml = fs.readFileSync(file, { encoding: "utf-8" });
    const data = yaml.safeLoad(yml);
    this.trace(data);
  }

  // render動作確認
  test_render() {
    const content = parser("# test");
    const page = this.render("test/site/themes/default/layouts", "index.ejs", { title: "test", content });
    this.trace(page);
  }

  /**
   * load yaml file
   * @param filepath {string} path to yaml file
   * @return {object}
   */
  loadYaml(filepath) {
    const yml = fs.readFileSync(filepath, { encoding: "utf-8" });
    return yaml.safeLoad(yml);
  }

  /**
   * load json file
   * @param filepath {string} path to json file
   * @return {object}
   */
  loadJson(filepath) {
    const json = fs.readFileSync(filepath, { encoding: "utf-8" });
    return JSON.parse(json);
  }

  /**
   * write json file
   * @param data {object} json data
   * @param filepath {string} path to json file
   */
  writeJson(data, filepath) {
    const text = JSON.stringify(data);
    fs.writeFileSync(filepath, text, { encoding: "utf-8" });
  }

  /**
   * render html
   * @param theme {string} theme folder path
   * @param layout {string} layout file name
   * @param data {object} page data
   * @return {string} html
   */
  render(theme, layout, data) {
    const layoutFile = path.join(theme, layout);
    return ejs.render(fs.readFileSync(layoutFile, { encoding: "utf-8" }), data, { filename: theme });
  }

  // globの動作確認
  glob_test() {
    const result = this.glob_files("test/site", "pages/**/*.md");
    console.log(`dir=${result.dir}`);
    result.files.forEach((file) => {
      const p = path.parse(path.join(result.dir, file));
      console.log(`${p.dir} : ${p.base}`);
    });
  }

  /**
   * globした結果を返す
   * @param target {string} glob target directory
   * @param pattern {string} glob pattern
   * @returns {object} dir: glob target directory (string), file: glob matching files (array)
   */
  glob_files(target, pattern) {
    const pwd = process.cwd();
    process.chdir(target);
    const files = glob.sync(pattern);
    const dir = process.cwd();
    process.chdir(pwd);

    return {dir, files};
  }
}

module.exports = Staticium;
