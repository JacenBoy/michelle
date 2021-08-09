// Search Kitsu for multiple anime
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
  if (!results || !results[0]) {
    message.channel.send("No results found");
    client.logger.warn(`No anime found for search term "${aniname}"`);
    return;
  }
  var fieldarry = [];
  for (var i=0;i<results.length;i++) {
    var aniresult = results[i].attributes;
    fieldarry[i] = {
      "name": aniresult.titles.en || aniresult.canonicalTitle || aniresult.titles.en_jp,
      "value": `Rating: ${aniresult.averageRating || 0}%\nEpisodes: ${aniresult.episodeCount || 0}\nStatus: ${aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`}\n[Kitsu.io](https://kitsu.io/anime/${aniresult.slug})`
    };
  }
  
  const embed = {"embed": {
    "title": "Search Results",
    "description": "\u200b",
    "color": client.colorInt("#fd8320"),
    "fields": fieldarry
  }}
  message.channel.send({"embeds": [embed]});
  client.logger.log(`Results found for search term "${aniname}"`);
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: ["asearch", "as"],
  permLevel: "User"
};
  
exports.help = {
  name: "animesearch",
  category: "Kitsu",
  description: "List the top ten results for an anime.",
  usage: "animesearch [name]"
};