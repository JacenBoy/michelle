// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16.0.0 or higher is required. Update Node on your system.");

// Load up the discord.js library
const Michelle = require("./base/Michelle");
const {Intents} = require("discord.js");
// We also load the rest of the things we need in this file:
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const DBL = require("dblapi.js");
const http = require("http");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.

// Use all non-privileged intents to spite people
const nonPrivilegedIntents = [
  Intents.FLAGS.GUILDS, 
  Intents.FLAGS.GUILD_BANS, 
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 
  Intents.FLAGS.GUILD_INTEGRATIONS, 
  Intents.FLAGS.GUILD_WEBHOOKS, 
  Intents.FLAGS.GUILD_INVITES, 
  Intents.FLAGS.GUILD_VOICE_STATES, 
  Intents.FLAGS.DIRECT_MESSAGES, 
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, 
  Intents.FLAGS.DIRECT_MESSAGE_TYPING
];

const client = new Michelle({intents: nonPrivilegedIntents, allowedMentions: {repliedUser: true}}, require("./config.js"));

if (client.config.dbltoken) { client.dbl = new DBL(client.config.dbltoken, client); }

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmds = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmds.length} slash commands`);
  cmds.forEach(c => {
    if (!c.endsWith(".js")) return;
    const response = client.loadCommand(c); // Pass "true" as the second argument for slash command processing
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

  // Load our API endpoints
  const apiFiles = await readdir("./api/");
  client.logger.log(`Loading a total of ${apiFiles.length} API endpoints.`);
  apiFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const endpointname = f.split(".")[0];
    try {
      client.logger.log(`Loading API module: ${endpointname}`);
      const apimod = require(`./api/${endpointname}.js`);
      client.endpoints.set(endpointname, apimod);
    } catch (ex) {
      client.logger.error(`Unable to load API module ${endpointname}: ${ex}`);
    }
  });

  // Here we login the client.
  client.login(client.config.token);

  // Create the HTTP listener for our API
  http.createServer(async (req, res) => {
    const args = req.url.toLowerCase().split("/");
    args.shift(); // Remove empty argument
    if (!args[0]) {
      const getEndpoints = async () => {
        const eplist = [];
        Array.from(client.endpoints.values()).forEach(e => {
          eplist.push(e.name);
        });
        return {"endpoints": eplist.length, "methods": eplist};
      };
      const alist = await getEndpoints();
      res.writeHead(300, {"Content-Type": "application/json", "Location": "/info"});
      res.end(JSON.stringify(alist));
      return;
    }
    const endpoint = client.endpoints.get(args.shift());
    if (!endpoint) {
      res.writeHead(400);
      res.end();
      return;
    }
    client.logger.cmd(`[API] An API request was made for the endpoint: ${endpoint.name}`);
    try {
      await endpoint.run(client, req, res, args);
    } catch (ex) {
      res.writeHead(500);
      client.logger.error(`API request failed: ${ex}`);
    }
    res.end();
  }).listen(client.config.apiport || 80);

// End top-level async/await function.
};

init();

/* MISCELANEOUS NON-CRITICAL FUNCTIONS */

// EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
// later, this conflicts with native code. Also, if some other lib you use does
// this, a conflict also occurs. KNOWING THIS however, the following 2 methods
// are, we feel, very useful in code. 

// <String>.toProperCase() returns a proper-cased string such as: 
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

// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  client.logger.error(`Uncaught Exception: ${errorMsg}`);
  // Always best practice to let the code crash on uncaught exceptions. 
  // Because you should be catching them anyway.
  //process.exit(1);
});

process.on("unhandledRejection", (reason, p) => {
  client.logger.error(`Unhandled rejection: \n${reason}\nStack:\n${reason.stack}\nPromise:\n${require("util").inspect(p, { depth: 2 })}`);
});
