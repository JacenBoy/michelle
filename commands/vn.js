// Search for a visual novel on VNDB
const VNDB = require("vndb-api");
const { DateTime } = require("luxon");

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Please specify a visual novel title.");
  else var vnname = args.join(" ");
  try {
    const vndb = new VNDB("michelle-vndb");
    var results = await vndb.query(`get vn basic,details (title~"${vnname}")`);
  } catch (ex) {
    message.channel.send("An error occurred running this command. Please try again later.");
    return client.logger.error(`An error occurred with the command:\n${JSON.stringify(ex)}`);
  }
  var vnresult = results.items[0];
  if (!vnresult) {
    message.channel.send("No results found");
    client.logger.warn(`No VN results found for ${vnname}`);
    return;
  }

  var langs = [];
  var plats = [];
  for (let i = 0; i < vnresult.languages.length; i++) {
    const lang = await client.getEmoji(vnresult.languages[i]);
    if (!lang) langs[i] = vnresult.languages[i];
    else langs[i] = lang;
  }
  for (let i = 0; i < vnresult.platforms.length; i++) {
    const platform = await client.getEmoji(vnresult.platforms[i]);
    if (!platform) plats[i] = vnresult.platforms[i];
    else plats[i] = platform;
  }

  const embed = {"embed":{
    "title": vnresult.title,
    "url": `https://vndb.org/v${vnresult.id}`,
    "description": client.cleanSyn(vnresult.description),
    "color": client.colorInt("#071c30"),
    "image": {"url": vnresult.image_nsfw ? (message.channel.nsfw ? vnresult.image : "https://michelle.jacenboy.com/assets/nsfw-overlay.png") : vnresult.image},
    "fields": [
      {"name": "Release Date", "value": DateTime.fromISO(vnresult.released).toFormat("MMM d',' yyyy")},
      {"name": "Languages", "value": langs.join(" ") || "\u200b"},
      {"name": "Platforms", "value": plats.join(" ") || "\u200b"}
    ]
  }};
  message.channel.send({"embeds": [embed]});
  client.logger.log(`Result found for search term "${vnname}": "${vnresult.title}"`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "vn",
  category: "VNDB",
  description: "Get information about a visual novel",
  usage: "vn [name]"
};