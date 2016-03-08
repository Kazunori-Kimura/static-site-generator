"use strict";
const com = require("commander");

com.version("1.0.0");

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

com.parse(process.argv);
