"use strict";
const fs = require("fs-extra-promise");
const path = require("path");
const co = require("co");
const marked = require("marked");

co(function*(){
  const readme = path.resolve(__dirname, "../README.md");
  const data = yield fs.readFileAsync(readme, { encoding: "utf-8" });
  const html = marked(data);
  console.log(html);
});
