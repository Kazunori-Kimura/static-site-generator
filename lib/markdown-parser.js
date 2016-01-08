"use strict";
const marked = require("marked");

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
  return marked(md, { renderer });
}

module.exports = parse;
