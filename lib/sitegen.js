"use strict";
const marked = require("marked");
const ejs = require("ejs");
const glob = require("glob");

module.exports = class SiteGen {
  test() {
    process.chdir("test/site");

    glob("pages/**/*.md", (err, files) => {
      files.forEach((item) => {
        console.log(item);
      });
    });
  }
};
