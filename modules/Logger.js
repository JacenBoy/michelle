/*
Logger class for easy and aesthetically pleasing console logging 
*/
const chalk = require("chalk");
const { DateTime } = require("luxon");
const fs = require("fs");

class Logger {
  static log (content, type = "log") {
    const time = DateTime.now();
    const timestamp = {
      full: time.toFormat("yyyy-MM-dd HH:mm:ss"),
      date: time.toFormat("yyyyMMdd"),
      time: time.toFormat("HH:mm:ss")
    };

    if (!fs.existsSync("./logs")) fs.mkdirSync("./logs");
    const stream = fs.createWriteStream(`./logs/${timestamp.date}.log`, {flags: "a"});

    switch (type) {
      case "log": {
        stream.end(`[${timestamp.full}]: ${type.toUpperCase()} - ${content} \n`);
        return console.log(`[${timestamp.full}]: ${chalk.bgBlue(type.toUpperCase())} ${content} `);
      }
      case "warn": {
        stream.end(`[${timestamp.full}]: ${type.toUpperCase()} - ${content} \n`);
        return console.log(`[${timestamp.full}]: ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
      }
      case "error": {
        stream.end(`[${timestamp.full}]: ${type.toUpperCase()} - ${content} \n`);
        return console.log(`[${timestamp.full}]: ${chalk.bgRed(type.toUpperCase())} ${content} `);
      }
      case "debug": {
        stream.end(`[${timestamp.full}]: ${type.toUpperCase()} - ${content} \n`);
        return console.log(`[${timestamp.full}]: ${chalk.green(type.toUpperCase())} ${content} `);
      }
      case "cmd": {
        stream.end(`[${timestamp.full}]: ${type.toUpperCase()} - ${content} \n`);
        return console.log(`[${timestamp.full}]: ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
      }
      case "ready": {
        stream.end(`[${timestamp.full}]: ${type.toUpperCase()} - ${content} \n`);
        return console.log(`[${timestamp.full}]: ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
      }
      default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
    }
  }

  static error (content) {
    return this.log(content, "error");
  }
  
  static warn (content) {
    return this.log(content, "warn");
  }
  
  static debug (content) {
    return this.log(content, "debug");
  } 
  
  static cmd (content) {
    return this.log(content, "cmd");
  } 
}

module.exports = Logger;