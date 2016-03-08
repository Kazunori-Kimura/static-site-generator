"use strict";
const marked = require("marked");
const ejs = require("ejs");
const yaml = require("yaml-front-matter");

// Synchronous highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

const renderer = new marked.Renderer();
renderer.code = (code, language) => {
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

/**
 * parse markdown
 * @param md {string} markdown text
 * @return {string} html
 */
function parse(md) {
  return marked(md, { renderer, gfm: true, tables: true });
}

/**
 * yaml front matter付きのmarkdownをhtmlに変換する
 * @param {string} markdown with yaml front matter
 * @param {object} site global parameters
 * @param {string} layout (index.ejs)
 * @param {string} layout folder path
 * @return {string} html
 */
function render(markdown, site, layout, layoutFolder) {
  // markdownとyaml front matterを分割
  const page = yaml.loadFront(markdown);
  // markdown -> html
  page.content = parse(page.__content);
  // layout反映
  const html = ejs.render(layout, { page, site }, { filename: layoutFolder });

  return html;
}

module.exports = { parse, render };
