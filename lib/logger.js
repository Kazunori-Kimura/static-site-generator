// logger
"use strict";
const moment = require("moment");

class Logger {
  constructor(isDebug) {
    this.isDebug = isDebug ? true : false;
  }

  setDebug(value) {
    this.isDebug = value ? true : false;
  }

  debug(msg) {
    if (this.isDebug) {
      this.write("debug", msg);
    }
  }

  trace(msg) {
    this.debug(msg);
  }

  info(msg) {
    this.write("info", msg);
  }

  error(msg, err) {
    this.write("error", msg);
    if (this.isDebug && err) {
      // errorを出力
      this.write("error", err.message);
    }
  }

  write(lv, msg) {
    console.log(`%s [${lv}] ${msg}`, moment().format("YYYY-MM-DD HH:mm:ss.SSS"));
  }

}

module.exports = new Logger();
