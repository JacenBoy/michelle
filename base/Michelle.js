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
    this.aliases = new Collection();
    this.endpoints = new Collection();

    // Require the logger module for persistent logging
    this.logger = require("../modules/Logger.js");

    // We'll use promisify around setTimeout in order to simulate "sleep" functionality
    this.wait = require("util").promisify(setTimeout);

    // Create connection to MongoDB
    this.mongoose = mongoose.connect(this.config.mongouri, {useNewUrlParser: true});
  }

  loadCommand (commandName) {
    try {
      this.logger.log(`Loading Command: ${commandName.split(".")[0]}`);
      const props = require(`../commands/${commandName}`);
      this.commands.set(props.help.name, props);
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  }

  async unloadCommand (commandName) {
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    return false;
  }

  // Function to deploy specific slash command
  async deploy(command, guild = undefined) {
    let cmd = this.commands.get(command);
    if (!cmd) {
      this.logger.warn(`Command ${command} is not loaded; loading now`);
      const res = this.loadCommand(command, true);
      if (res) {
        return this.logger.error(`Error loading command ${command}: ${res}`);
      }
      cmd = this.commands.get(command);
    }
    if (!cmd.conf.enabled) return this.logger.warn(`Command ${cmd.help.name} is disabled`);
    const data = {
      "name": cmd.help.name,
      "description": cmd.help.description,
      "options": cmd.conf.options
    };
    try {
      if (guild) {
        await this.guilds.cache.get(guild)?.commands.create(data);
      } else {
        if (cmd.conf.global) {
          await this.application?.commands.create(data);
        } else {
          this.guilds.cache.map(async (guild) => {
            if (cmd.conf.special && !cmd.conf.special.includes(guild)) return; // Do not deploy server-restricted commands
            await this.guilds.cache.get(guild)?.commands.create(data);
          });
        }
      }
    } catch (ex) {
      this.logger.error(`Error deploying command ${cmd.help.name}: ${ex}`);
    }
  }

  // Function to deploy all slash commands
  async deployCommands () {
    this.commands.map(async (cmd) => {
      try {
        if (!cmd.conf.enabled) return; // Do not deploy disabled commands
        const data = {
          "name": cmd.help.name,
          "description": cmd.help.description,
          "options": cmd.conf.options
        };
        if (cmd.conf.global) {
          await this.application?.commands.create(data);
        } else {
          this.guilds.cache.map(async (guild) => {
            if (cmd.conf.special && !cmd.conf.special.includes(guild.id)) return; // Do not deploy server-restricted commands
            await this.guilds.cache.get(guild.id)?.commands.create(data);
          });
        }
      } catch (ex) {
        this.logger.error(`Error deploying command ${cmd.help.name}: ${ex}`);
      }
    });
  }


  //PERMISSION LEVEL FUNCTION
  // Uses a switch/case and fallthroughs to identify the correct permissions
  checkPermissions (permLevel, userId) {
    switch (permLevel) {
      case "User":
        // Always return true for the user check
        return true;
      case "Support":
        // Check if the user is in the support list
        if (this.config.support.includes(userId)) return true;
      case "Admin":
        // Check if the user is in the admins list
        if (this.config.admins.includes(userId)) return true;
      case "Owner":
        // Check if the user is the bot owner
        if (this.config.ownerID == userId) return true;
      default:
        // If we've fallen through this far, the user does not have the correct permissions
        return false;
    }
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
    const xhttp = new XMLHttpRequest();
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
    const xhttp = new XMLHttpRequest();
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
    const xhttp = new XMLHttpRequest();
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
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    for (const header of headers) {
      xhttp.setRequestHeader(header.header, header.value);
    }
    return xhttp.send(JSON.stringify(data));
  }
}

module.exports = Michelle;