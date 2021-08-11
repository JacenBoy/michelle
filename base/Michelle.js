const {Client, Collection} = require("discord.js");
const mongoose = require("mongoose");

class Michelle extends Client {
  constructor (options, config) {
    super(options);

    // Here we load the config file that contains our token and our prefix values.
    // client.config.token contains the bot's token
    // client.config.prefix contains the message prefix
    this.config = config;

    // Aliases and commands are put in collections where they can be read from,
    // catalogued, listed, etc.
    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.aliases = new Collection();
    this.endpoints = new Collection();

    // Require the logger module for persistent logging
    this.logger = require("../modules/Logger.js");

    // We'll use promisify around setTimeout in order to simulate "sleep" functionality
    this.wait = require("util").promisify(setTimeout);

    // Create connection to MongoDB
    this.mongoose = mongoose.connect(this.config.mongouri, {useNewUrlParser: true});
  }

  loadCommand (commandName, isSlash = false) {
    if (isSlash) {
      try {
        this.logger.log(`Loading Command: ${commandName.split(".")[0]}`);
        const props = require(`../slashCommands/${commandName}`);
        this.slashCommands.set(props.help.name, props);
        return false;
      } catch (e) {
        return `Unable to load command ${commandName}: ${e}`;
      }
    } else {
      try {
        this.logger.log(`Loading Command: ${commandName.split(".")[0]}`);
        const props = require(`../commands/${commandName}`);
        if (props.init) {
          props.init(this);
        }
        this.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          this.aliases.set(alias, props.help.name);
        });
        return false;
      } catch (e) {
        return `Unable to load command ${commandName}: ${e}`;
      }
    }
  }

  async unloadCommand (commandName) {
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
  
    if (command.shutdown) {
      await command.shutdown(this);
    }
    const mod = require.cache[require.resolve(`../commands/${commandName}`)];
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    return false;
  }

  /*
  PERMISSION LEVEL FUNCTION

  This is a very basic permission system for commands which uses "levels"
  "spaces" are intentionally left black so you can add them if you want.
  NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
  command including the VERY DANGEROUS `eval` and `exec` commands!

  */
  permlevel (message) {
    let permlvl = 0;

    const permOrder = this.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  }

  /*
  MESSAGE CLEAN FUNCTION

  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
  async clean (client, text) {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof text !== "string")
      text = require("util").inspect(text, {depth: 1});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  }

  getSettings () {
    // Temporary workaround while phasing out Enmap
    // Who am I kidding; this isn't going anywhere
    return this.config.defaultSettings;
  }

  /* MICHELLE-SPECIFIC FUNCTIONS */
  // Various functions specific to Michelle. These are necessary for various
  // command functions. For the most part, these are for code readability
  // and general convenience

  // randInt - generates a random integer.
  randInt (min, max) {
    return Math.floor(Math.random() * (+max - +min)) + +min;
  }

  // cleanSyn - clean and shorten a synopsis to under 512 characters
  cleanSyn (synin) {
    if (!synin) {
      return "No synopsis provided";
    }
    if (! /\S/.test(synin)) {
      return "No synopsis provided";
    }
    synin = synin.replace(/(<p>)?(<\/p>)?(<a.*>)?(<\/a>)?/g, "");
    if (synin.length >= 512) {
      return synin.substring(0, synin.lastIndexOf(" ", 502)) + "... (more)";
    }
    return synin;
  }

  // getEmoji - Take a string, determine if it corresponds to a native or
  // custom emote, and return the correct output for that emote
  async getEmoji (search) {
    const emojis = require("../models/emoji.js");
    const emoji = await emojis.findOne({"idString": search.toLowerCase()});
    if (!emoji) return false;

    if (emoji.isCustom) return this.emojis.cache.get(emoji.emoji);
    else return emoji.emoji;
  }

  // colorInt - Turn a standard hex color code into a decinal for embeds
  colorInt (hexin) {
    return parseInt(hexin.split("#")[1], 16);
  }

  // pad - Zero pad a number
  pad (n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  /* API FUNCTIONS */
  // In order to support the botlists with garbage APIs, we'll set up functions
  // to post server counts to those botlists.

  // If you want to post stats to one of these botlists for whatever reason,
  // you'll have to make the necessary edits to config.js yourself.

  // DiscordBotList.com
  async dblcomStats (token) {
    if (!this.user) return;
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `https://discordbotlist.com/api/bots/${this.user.id}/stats`, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.setRequestHeader("Authorization", `Bot ${token}`);
    const data = {"guilds": this.guilds.cache.values().length};
    xhttp.send(JSON.stringify(data));
  }

  // Bots On Discord
  async bodStats (token) {
    if (!this.user) return;
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `https://bots.ondiscord.xyz/bot-api/bots/${this.user.id}/guilds`, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.setRequestHeader("Authorization", `${token}`);
    const data = {"guildCount": this.guilds.cache.values().length};
    xhttp.send(JSON.stringify(data));
  }

  // discord.bots.gg
  async dbggStats (token) {
    if (!this.user) return;
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `https://discord.bots.gg/api/v1/bots/${this.user.id}/stats`, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.setRequestHeader("Authorization", `${token}`);
    const data = {"guildCount": this.guilds.cache.values().length};
    xhttp.send(JSON.stringify(data));
  }

  // Generic - Posts a generic XMLHTTPRequest in JSON. Usable for any bot lists
  // not previously coded, or for other POST requests you might want to do.
  async postJson (url, headers, data) {
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    for (var header of headers) {
      xhttp.setRequestHeader(header.header, header.value);
    }
    return xhttp.send(JSON.stringify(data));
  }
}

module.exports = Michelle;