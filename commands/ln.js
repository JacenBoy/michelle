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
  var title = results.results[0].match[0][1];
  try {
    results =  await wln.getDetails(title);
  } catch (ex) {
    message.channel.send("An error occurred running this command. Please try again later.");
    return client.logger.error(`An error occurred with the command:\n${JSON.stringify(ex)}`);
  }
  const lnresult = results[0];
  if (!lnresult) {
    message.channel.send("No results found");
    client.logger.warn(`No LN results found for ${lnname}`);
    return;
  }
  if (!lnresult.covers[0]) lnresult.covers[0] = {"url": "://via.placeholder.com/350x500.png?text=No+image+provided/"};
  message.channel.send({"embed": {
    "title": lnresult.title,
    "description": client.cleanSyn(lnresult.description),
    "url": `https://www.wlnupdates.com/series-id/${lnresult.id}`,
    "color": client.colorInt("#f0f0f0"),
    "image": {"url": `https${lnresult.covers[0].url}`}
  }});
  client.logger.log(`Result found for search term "${lnname}": "${lnresult.title}"`);
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