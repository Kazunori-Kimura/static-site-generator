"use strict";
const marked = require("marked");
const mkdirp = require("mkdirp");
const ejs = require("ejs");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

class SiteGen {
  constructor(){
    // Synchronous highlighting with highlight.js
    marked.setOptions({
      highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
      }
    });

    this.renderer = new marked.Renderer();
    this.renderer.code = (code, language) => {
      if (code.match(/^sequenceDiagram/) || code.match(/^graph/)) {
        return `<div class="mermaid">${code}</div>`;
      } else if (code.match(/^graphviz/)) {
        return `<div class="graphviz">${code}</div>`;
      } else {
        const source = this.options.highlight(code, language);
        return `<pre><code class="${this.options.langPrefix}${language}">
${source}
</pre></code>`;
      }
    };

    // debugログ出力
    this.isDebug = true;
  }

  /**
   * initコマンドで呼ばれる処理
   */
  init() {
    this.trace("init");
  }

  // 動作確認
  test() {
    const content = this.parse("# test");
    const page = this.render("test/site/themes/default/layouts", "index.ejs", { title: "test", content });
    this.trace(page);
  }

  /**
   * parse markdown
   * @param md {string} markdown text
   * @return {string} html
   */
  parse(md) {
    return marked(md, { renderer: this.renderer });
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

  // globのテスト
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
    // generator使いたいけど...
    const files = glob.sync(pattern);
    const dir = process.cwd();
    process.chdir(pwd);

    return {dir, files};
  }

  trace(msg) {
    if (this.isDebug) {
      console.log(msg);
    }
  }
}

module.exports = SiteGen;
