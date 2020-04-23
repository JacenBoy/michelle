// Search for a visual novel on VNDB

exports.run = async (client, message, args, level) => {
  const VNDB = require("vndb-api");
  const moment = require("moment");
  if (!args[0]) return message.channel.send("Please specify an visual novel title.");
  else var vnname = args.join(" ");
  try {
    const vndb = new VNDB("michelle-vndb");
    var results = await vndb.query(`get vn basic,details (title~"${vnname}")`);
  } catch (ex) {
    return client.logger.error(ex.msg);
  }
  var vnresults = results.items;
  if (!vnresults[0]) {
    message.channel.send("No results found");
    client.logger.warn(`No VN found for search term ${vnname}`);
    return;
  }
  var fieldarry = [];
  for (var i=0;i<vnresults.length;i++) {
    var vnresult = vnresults[i];
    fieldarry[i] = {
      "name": vnresult.title,
      "value": `Release Date: ${moment(vnresult.released).format("MMM D[,] YYYY")}\nLanguages: ${vnresult.languages.join(", ")}\nPlatforms: ${vnresult.platforms.join(", ")}\n[VNDB.org](https://vndb.org/v${vnresult.id})`
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