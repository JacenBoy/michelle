module.exports = (client) => {

  /*
  PERMISSION LEVEL FUNCTION

  This is a very basic permission system for commands which uses "levels"
  "spaces" are intentionally left black so you can add them if you want.
  NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
  command including the VERY DANGEROUS `eval` and `exec` commands!

  */
  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  /*
  GUILD SETTINGS FUNCTION

  This function merges the default settings (from config.defaultSettings) with any
  guild override you might have for particular guild. If no overrides are present,
  the default settings are used.

  */
  // getSettings merges the client defaults with the guild settings. guild settings in
  // enmap should only have *unique* overrides that are different from defaults.
  client.getSettings = (guild) => {
    client.settings.ensure("default", client.config.defaultSettings);
    if(!guild) return client.settings.get("default");
    const guildConf = client.settings.get(guild.id) || {};
    // This "..." thing is the "Spread Operator". It's awesome!
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    return ({...client.settings.get("default"), ...guildConf});
  };

  /*
  SINGLE-LINE AWAITMESSAGE

  A simple way to grab a single reply, from the user that initiated
  the command. Useful to get "precisions" on certain things...

  USAGE

  const response = await client.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);

  */
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };


  /*
  MESSAGE CLEAN FUNCTION

  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof text !== "string")
      text = require("util").inspect(text, {depth: 1});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };

  client.loadCommand = (commandName) => {
    try {
      client.logger.log(`Loading Command: ${commandName.split(".")[0]}`);
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
  
    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = require.cache[require.resolve(`../commands/${commandName}`)];
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  /* API FUNCTIONS */
  // In order to support the botlists with garbage APIs, we'll set up functions
  // to post server counts to those botlists.

  // If you want to post stats to one of these botlists for whatever reason,
  // you'll have to make the necessary edits to config.js yourself.

  // DiscordBotList.com
  client.dblcomStats = async (token) => {
    if (!client.user) return;
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `https://discordbotlist.com/api/bots/${client.user.id}/stats`, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.setRequestHeader("Authorization", `Bot ${token}`);
    const data = {"guilds": client.guilds.cache.array().length, "users": client.users.cache.array().length};
    xhttp.send(JSON.stringify(data));
  };

  // Bots On Discord
  client.bodStats = async (token) => {
    if (!client.user) return;
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `https://bots.ondiscord.xyz/bot-api/bots/${client.user.id}/guilds`, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.setRequestHeader("Authorization", `${token}`);
    const data = {"guildCount": client.guilds.cache.array().length};
    xhttp.send(JSON.stringify(data));
  };

  // discord.bots.gg
  client.dbggStats = async (token) => {
    if (!client.user) return;
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `https://discord.bots.gg/api/v1/bots/${client.user.id}/stats`, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.setRequestHeader("Authorization", `${token}`);
    const data = {"guildCount": client.guilds.cache.array().length};
    xhttp.send(JSON.stringify(data));
  };

  // Generic - Posts a generic XMLHTTPRequest in JSON. Usable for any bot lists
  // not previously coded, or for other POST requests you might want to do.
  client.postJson = async (url, headers, data) => {
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    for (var header of headers) {
      xhttp.setRequestHeader(header.header, header.value);
    }
    return xhttp.send(JSON.stringify(data));
  };

  /* MISCELANEOUS NON-CRITICAL FUNCTIONS */
  
  // EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
  // later, this conflicts with native code. Also, if some other lib you use does
  // this, a conflict also occurs. KNOWING THIS however, the following 2 methods
  // are, we feel, very useful in code. 
  
  // <String>.toPropercase() returns a proper-cased string such as: 
  // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
  Object.defineProperty(String.prototype, "toProperCase", {
    value: function() {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
  });

  // <Array>.random() returns a single random element from an array
  // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
  Object.defineProperty(Array.prototype, "random", {
    value: function() {
      return this[Math.floor(Math.random() * this.length)];
    }
  });

  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);

  // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    // Always best practice to let the code crash on uncaught exceptions. 
    // Because you should be catching them anyway.
    //process.exit(1);
  });

  /*process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
  });*/

  process.on("unhandledRejection", (reason, p) => {
    client.logger.error(`Unhandled rejection: \n${reason}\nStack:\n${reason.stack}\nPromise:\n${require("util").inspect(p, { depth: 2 })}`);
  });

  /* MICHELLE-SPECIFIC FUNCTIONS */
  // Various functions specific to Michelle. These are necessary for various
  // command functions. For the most part, these are for code readability.

  // randInt - generates a random integer.
  client.randInt = (min, max) => {
    return Math.floor(Math.random() * (+max - +min)) + +min;
  };

  // cleanSyn - clean and shorten a synopsis to under 1024 characters
  client.cleanSyn = (synin) => {
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
  };

  client.getEmoji = async (search) => {
    const emojis = require("../models/emoji.js");
    const emoji = await emojis.findOne({"idString": search.toLowerCase()});
    if (!emoji) return false;

    if (emoji.isCustom) return client.emojis.cache.get(emoji.emoji);
    else return emoji.emoji;
  };

  // colorInt - Turn a standard hex color code into a decinal for embeds.
  client.colorInt = (hexin) => {
    return parseInt(hexin.split("#")[1], 16);
  };

  // pad - Zero pad a number
  client.pad = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };
};
