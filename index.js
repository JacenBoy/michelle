// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const DBL = require("dblapi.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Discord.Client({disableEveryone: true});

// Here we load the config file that contains our token and our prefix values.
client.config = require("./config.js");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

if (client.config.dbltoken) { const dbl = new DBL(client.config.dbltoken, client); }

// Require our logger
client.logger = require("./modules/Logger");

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();
client.endpoints = new Enmap();

// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({name: "settings"});

// Include other custom Enmap collections.
client.profiles = new Enmap({name: "profiles"});
client.horny = new Enmap({name: "horny"});
client.owners = new Enmap({name: "owners"});

// Import the quotes and clips files to allow the quote and clip systems to work properly.
//client.quotes = require("./modules/quotes.json");
//client.clips = require("./modules/clips.json");

// Open connection to MongoDB
const mongoose = require("mongoose");
client.mongoose = mongoose.connect(client.config.mongouri, {useNewUrlParser: true});

// Require http to allow simle and dirty uptime monitoring
var http = require("http");

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
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

  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

  // Create the HTTP listener for our API
  http.createServer(async (req, res) => {
    var url = require("url");
    var u = url.parse(req.url);
    var args = u.pathname.toLowerCase().split("/");
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
    client.logger.cmd(`An API request was made for the endpoint: ${endpoint.name}`);
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
