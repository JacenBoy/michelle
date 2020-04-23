// Get information about a light novel from WLN Updates
const WLNUpdates = require("../modules/WLNUpdates.js");

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Please specify an anime name.");
  else var lnname = args.join(" ");
  const wln = new WLNUpdates();
  try {
    var results =  await wln.getLN(lnname);
  } catch (ex) {
    message.channel.send("An error occurred running this command. Please try again later.");
    return client.logger.error(`An error occurred with the command:\n${JSON.stringify(ex)}`);
  }
  client.logger.debug(JSON.stringify(results));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ln",
  category: "WLN Updates",
  description: "Show information about a light novel on WLN Updates.",
  usage: "ln [title]"
};