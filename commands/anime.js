// Search Kitsu for an anime
const kitsu = require("node-kitsu");

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Please specify an anime name.");
  else var aniname = args.join(" ");
  client.logger.debug(`Search started for search term "${aniname}"`);
  try {
    var results = await kitsu.searchAnime(aniname, 0);
  } catch (ex) {
    if (ex.message.indexOf("ERR_UNESCAPED_CHARACTERS") != -1) {
      message.channel.send("This command only accepts English and Romaji titles. Please translate the title and try again.");
    } else {
      message.channel.send("An error occurred running this command. Please try again later.");
    }
    return client.logger.error(`${ex}`);
  }
  if (!results) {
    message.channel.send("No results found");
    client.logger.warn(`No anime found for search term "${aniname}"`);
    return;
  }
  var aniresult = results[0].attributes;
  message.channel.send({ "embed": {
    "title": aniresult.titles.en || aniresult.canonicalTitle || aniresult.titles.en_jp,
    "url": `https://kitsu.io/anime/${aniresult.slug}`,
    "description": client.cleanSyn(aniresult.synopsis),
    "color": client.colorInt("#fd8320"),
    "image": { "url": aniresult.posterImage.small },
    "fields": [
      { "name": "Rating:", "value": `${aniresult.averageRating || 0}% Approval`, "inline": true },
      { "name": "Episodes:", "value":  `${aniresult.episodeCount || 0} (${aniresult.subtype})`, "inline": true },
      { "name": "Status:", "value": aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`, "inline": true }
    ]
  }});
  client.logger.log(`Result found for search term "${aniname}": "${aniresult.titles.en || aniresult.canonicalTitle || aniresult.titles.en_jp}"`);
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  special: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "anime",
  category: "Kitsu",
  description: "Show information about an anime on Kitsu.",
  usage: "anime [name]"
};