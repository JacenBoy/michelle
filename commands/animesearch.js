/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Search Kitsu for multiple anime

exports.run = async (client, message, args, level) => {
  if (!args[0]) {
    var aniname = await client.awaitReply(message, "What is the name of the anime you want to search for?", 15000);
    if (!aniname) return client.logger.warn(`${message.author.username}'s request timed out.`);
  }
  else var aniname = args.join(" ");
  var embed;
  var results = await client.kitsu.searchAnime(aniname, 0)
  if (!results[0].attributes.titles) {
    message.channel.send("No results found");
    client.logger.warn(`No anime found for search term "${aniname}"`);
    return;
  }
  var fieldarry = [];
  for (var i=0;i<results.length;i++) {
    fieldarry[i] = {
      "name": aniresult.titles.en || aniresult.titles.en_jp || aniresult.canonicalTitle,
      "value": `Rating: ${aniresult.averageRating || 0}%\nEpisodes: ${aniresult.episodeCount || 0}\nStatus: ${aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`}\n[Kitsu.io](https://kitsu.io/anime/${aniresult.slug})`
    };
  }
  embed = { "embed": { "title": "Search Results", "description": "\u200b", "fields": fieldarry } };
  message.channel.send(embed);
  client.logger.log(`Results found for search term "${aniname}"`);
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["asearch", "as"],
  permLevel: "User"
};
  
exports.help = {
  name: "animesearch",
  category: "Kitsu",
  description: "List the top ten results for an anime.",
  usage: "animesearch [name]"
};