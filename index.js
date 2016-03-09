"use strict";
const com = require("commander");
const Staticium = require("./lib/staticium");
const pck = require("./package.json");

com.version(pck.version);

// init
com
  .command("init <site_name>")
  .alias("i")
  .description("initialize site directory.")
  .option("-d, --debug", "debug mode.")
  .action((site_name, options) => {
    if (options.debug) {
      console.log("debug mode.");
    }
    console.log(site_name);
  });

// generate
com
  .command("generate [site_path]")
  .alias("g")
  .description("generate site.")
  .option("-d, --debug", "debug mode.")
  .action((site_path, options) => {
    site_path = site_path || __dirname;

    console.log(site_path);
  });

// test
com
  .command("test")
  .alias("t")
  .description("test")
  .option("-d, --debug", "debug mode.")
  .action((options) => {
    // --- test code ---
    const path = require("path");
    const site_path = path.resolve(__dirname, "./test/sample-site");

    const staticium = new Staticium();
    //staticium.test_load(site_path);
    staticium.test();
  });

com.parse(process.argv);
