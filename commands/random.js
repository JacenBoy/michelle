/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Search Kitsu for an anime

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Missing argument. Please specify either anime or manga.");
  var embed;
  switch (args[0].toLowerCase()) {
    case "anime":
      var aniresult;
      while (!aniresult.titles) {
        client.kitsu.listAnime(client.randInt(0, 10000)).then(results => {
          try {
            aniresult = results[0].attributes;
            var anititle = aniresult.titles.en || aniresult.titles.en_jp;
            var anirating = aniresult.averageRating || 0;
            var epcount = aniresult.episodeCount || 0;
            var anistatus = aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`;
            var strsyn = aniresult.synopsis == "" ? "No synopsis available" : aniresult.synopsis;
            if (strsyn.length >= 1024) {
              strsyn = strsyn.substring(0, strsyn.lastIndexOf(" ", 1017)) + " (more)";
            }
            embed = { "embed": {
              "title": anititle,
              "url": "https://kitsu.io/anime/" + aniresult.slug,
              "description": strsyn,
              "image": { "url": aniresult.posterImage.small },
              "fields": [
                { "name": "Rating:", "value": `${anirating}% Approval`, "inline": true },
                { "name": "Episodes:", "value":  `${epcount.toString()} (${aniresult.subtype})`, "inline": true },
                { "name": "Status:", "value": anistatus, "inline": true }
              ]
            } };
          } catch (ex) {
            // Ignore the error and keep rolling
          }
        });
      }
      break;
    case "manga":
      var aniresult;
      while (!aniresult.titles) {
        client.kitsu.listManga(client.randInt(0, 10000)).then(results => {
          try {
            aniresult = results[0].attributes;
            var anititle = aniresult.titles.en || aniresult.titles.en_jp;
            if (!anititle) throw "No English/Romaji title";
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
          } catch (ex) {
            // Ignore the error and keep rolling
          }
        });
      }
      break;
    default:
      return message.channel.send("Invalid argument. Please specify either anime or manga.");
  }
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "random",
  category: "Kitsu",
  description: "Get a random anime/manga from Kitsu.",
  usage: "random [Anime/Manga]"
};