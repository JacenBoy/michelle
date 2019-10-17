// Search Kitsu for a manga

exports.run = async (client, message, args, level) => {
  const kitsu = require("node-kitsu");
  if (!args[0]) return message.channel.send("Please specify a manga name.");
  else var aniname = args.join(" ");
  var embed;
  try {
    var results = await kitsu.searchManga(aniname, 0);
  } catch (ex) {
    message.channel.send("An error occured running this command. This is likely due to an issue on Kitsu's end, and not an error with the bot. Please try your command again later.");
    return client.logger.error(`An error occurred with the command: ${ex}`);
  }
  var aniresult = results[0].attributes;
  if (!aniresult.titles) {
    message.channel.send("No results found");
    client.logger.warn(`No manga found for search term "${aniname}"`);
    return;
  }
  embed = { "embed": {
    "title": aniresult.titles.en || aniresult.canonicalTitle || aniresult.titles.en_jp,
    "url": `https://kitsu.io/manga/${aniresult.slug}`,
    "description": client.cleanSyn(aniresult.synopsis),
    "color": client.colorInt("#fd8320"),
    "image": { "url": aniresult.posterImage.small },
    "fields": [
      { "name": "Rating:", "value": `${aniresult.averageRating || 0}% Approval`, "inline": true },
      { "name": "Chapters:", "value":  `${aniresult.chapterCount || 0} (${aniresult.subtype})`, "inline": true },
      { "name": "Status:", "value": aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`, "inline": true }
    ]
  } };
  message.channel.send(embed);
  client.logger.log(`Result found for search term "${aniname}": "${embed.embed.title}"`);
};
  
exports.conf = {
  enabled: false,
  guildOnly: false,
  special: false,
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: "manga",
  category: "Kitsu",
  description: "Show information about a manga on Kitsu.",
  usage: "manga [name]"
};