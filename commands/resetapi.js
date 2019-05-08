// Reset the API endpoints. Useful for loading new endpoints.

exports.run = async (client, message, args, level) => {
  var msg = await message.channel.send("Resetting all API endpoints...");

  client.endpoints.array().forEach(e => {
    try {
      client.logger.log(`Ending API module: ${e.name}`);
      delete require.cache[require.resolve(`../api/${e.name}.js`)];
    } catch (ex) {
      client.logger.error(`Unable to end API module ${e.name}: ${ex}`);
    }
  });

  client.endpoints.deleteAll();
  
  const { promisify } = require("util");
  const readdir = promisify(require("fs").readdir);

  const apiFiles = await readdir("./api/");
  client.logger.log(`Loading a total of ${apiFiles.length} API endpoints.`);
  apiFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const endpointname = f.split(".")[0];
    try {      
      client.logger.log(`Loading API module: ${endpointname}`);
      const apimod = require(`../api/${endpointname}.js`);
      client.endpoints.set(endpointname, apimod);
    } catch (ex) {
      client.logger.error(`Unable to load API module ${endpointname}: ${ex}`);
    }
  });

  msg.edit("All API endpoints have been reset.");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "resetapi",
  category: "System",
  description: "Reloads active API enpoinds, and loads new ones",
  usage: "resetapi"
};