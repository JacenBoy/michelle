/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Search Kitsu for a manga

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Please enter a manga name.");
  var embed;
  var aniname = "";
  for (var i=0;i<args.length;i++) {
    aniname += args[i];
    if (i != args.length - 1) {
      aniname += " ";
    }
  }
  client.kitsu.searchManga(aniname, 0).then(results => {
    var aniresult = results[0].attributes;
    if (!aniresult.titles) {
      message.channel.send("No results found");
      client.logger.warn(`No manga found for search term "${aniname}"`);
      return;
    }
    embed = { "embed": {
      "title": aniresult.titles.en || aniresult.titles.en_jp || aniresult.canonicalTitle,
      "url": `https://kitsu.io/manga/${aniresult.slug}`,
      "description": client.cleanSyn(aniresult.synopsis),
      "image": { "url": aniresult.posterImage.small },
      "fields": [
        { "name": "Rating:", "value": `${aniresult.averageRating || 0}% Approval`, "inline": true },
        { "name": "Chapters:", "value":  `${aniresult.chapterCount || 0} (${aniresult.subtype})`, "inline": true },
        { "name": "Status:", "value": aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`, "inline": true }
      ]
    } };
    message.channel.send(embed);
    client.logger.log(`Result found for search term "${aniname}": "${aniresult.titles.en || aniresult.titles.en_jp || aniresult.canonicalTitle}"`);
  });
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: "manga",
  category: "Kitsu",
  description: "Show information about a manga on Kitsu.",
  usage: "manga [name]"
};