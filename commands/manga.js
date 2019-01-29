/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Search Kitsu for a manga

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send('Please enter a manga name.');
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
      var anititle = aniresult.titles.en || aniresult.titles.en_jp || aniresult.canonicalTitle;
      var anirating = aniresult.averageRating || 0;
      var epcount = aniresult.chapterCount || 0;
      var anistatus = aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`;
      var strsyn = aniresult.synopsis == "" ? "No synopsis available" : aniresult.synopsis;
      if (strsyn.length >= 1024) {
        strsyn = strsyn.substring(0, strsyn.lastIndexOf(" ", 1017)) + " (more)";
      }
      embed = { "embed": {
        "title": anititle,
        "url": "https://kitsu.io/manga/" + aniresult.slug,
        "description": strsyn,
        "image": { "url": aniresult.posterImage.small },
        "fields": [
          { "name": "Rating:", "value": `${anirating}% Approval`, "inline": true },
          { "name": "Chapters:", "value":  `${epcount.toString()} (${aniresult.subtype})`, "inline": true },
          { "name": "Status:", "value": anistatus, "inline": true }
        ]
      } };
      message.channel.send(embed);
      if (!anititle) client.logger.warn(`No English or Romaji title found for search term "${aniname}"`);
      else client.logger.log(`Result found for search term "${aniname}": "${anititle}"`);
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