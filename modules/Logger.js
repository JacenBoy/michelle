/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/*
Logger class for easy and aesthetically pleasing console logging 
*/
const chalk = require("chalk");
const moment = require("moment");
const fs = require("fs");

exports.log = (content, type = "log") => {
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
  const stream = fs.createWriteStream(`./logs/${moment().format("YYYYMMDD")}.log`, {flags: "a"});
  switch (type) {
    case "log": {
      stream.end(`${timestamp} ${type.toUpperCase()} - ${content} \n`);
      return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
    }
    case "warn": {
      stream.end(`${timestamp} ${type.toUpperCase()} - ${content} \n`);
      return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
    }
    case "error": {
      stream.end(`${timestamp} ${type.toUpperCase()} - ${content} \n`);
      return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
    }
    case "debug": {
      stream.end(`${timestamp} ${type.toUpperCase()} - ${content} \n`);
      return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
    }
    case "cmd": {
      stream.end(`${timestamp} ${type.toUpperCase()} - ${content} \n`);
      return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
    }
    case "ready": {
      stream.end(`${timestamp} ${type.toUpperCase()} - ${content} \n`);
      return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
    }
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
}; 

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");
