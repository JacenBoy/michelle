// Search Kitsu for multiple manga
const kitsu = require("node-kitsu");

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Please specify a manga name.");
  else var aniname = args.join(" ");
  client.logger.debug(`Search started for search term "${aniname}"`);
  try {
    var results = await kitsu.searchManga(aniname, 0);
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
    client.logger.warn(`No manga found for search term "${aniname}"`);
    return;
  }
  var fieldarry = [];
  for (var i=0;i<results.length;i++) {
    var aniresult = results[i].attributes;
    fieldarry[i] = {
      "name": aniresult.titles.en || aniresult.canonicalTitle || aniresult.titles.en_jp,
      "value": `Rating: ${aniresult.averageRating || 0}%\nChapters: ${aniresult.chapterCount || 0}\nStatus: ${aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`}\n[Kitsu.io](https://kitsu.io/manga/${aniresult.slug})`
    };
  }

  const embed = {"embed": { 
    "title": "Search Results", 
    "description": "\u200b", 
    "color": client.colorInt("#fd8320"), 
    "fields": fieldarry 
  }};
  message.channel.send({"embeds": [embed]});
  client.logger.log(`Results found for search term "${aniname}"`);
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: ["msearch", "ms"],
  permLevel: "User"
};
  
exports.help = {
  name: "mangasearch",
  category: "Kitsu",
  description: "List the top ten results for a manga.",
  usage: "mangasearch [name]"
};