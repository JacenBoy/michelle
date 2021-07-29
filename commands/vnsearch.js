// Search for a visual novel on VNDB
const VNDB = require("vndb-api");
//const moment = require("moment");

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
  var vnresults = results.items;
  if (!vnresults[0]) {
    message.channel.send("No results found");
    client.logger.warn(`No VN found for search term ${vnname}`);
    return;
  }
  var fieldarry = [];
  var langs = [];
  var plats = [];
  for (let i = 0; i < vnresults.length; i++) {
    var vnresult = vnresults[i];
    for (let j = 0; j < vnresult.languages.length; j++) {
      const lang = await client.getEmoji(vnresult.languages[j]);
      if (!lang) langs[j] = vnresult.languages[j];
      else langs[j] = lang;
    }
    for (let j = 0; j < vnresult.platforms.length; j++) {
      const platform = await client.getEmoji(vnresult.platforms[j]);
      if (!platform) plats[j] = vnresult.platforms[j];
      else plats[j] = platform;
    }
    fieldarry[i] = {
      "name": vnresult.title,
      //"value": `Release Date: ${moment(vnresult.released).format("MMM D[,] YYYY")}\nLanguages: ${langs.join(" ")}\nPlatforms: ${plats.join(", ")}\n[VNDB.org](https://vndb.org/v${vnresult.id})`
      "value": `Languages: ${langs.join(" ")}\nPlatforms: ${plats.join(", ")}\n[VNDB.org](https://vndb.org/v${vnresult.id})`
    };
  }
  message.channel.send({"embed": {
    "title": "Search Results",
    "description": "\u200b",
    "color": client.colorInt("#071c30"),
    "fields": fieldarry
  }});
  client.logger.log(`Result found for search term "${vnname}"`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: ["vs"],
  permLevel: "User"
};

exports.help = {
  name: "vnsearch",
  category: "VNDB",
  description: "List the top ten results for a visual novel.",
  usage: "vnsearch [name]"
};