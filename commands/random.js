/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Search Kitsu for an anime

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Missing argument. Please specify either anime or manga.");
  var embed;
  switch (args[0].toLowerCase()) {
    case "anime":
      var anifound = false;
      while (!anifound) {
        var rnd = client.randInt(0, 10);
        client.kitsu.listAnime(rnd).then(results => {
          client.logger.debug(`Kitsu queried. Index number ${rnd}`);
          try {
            var aniresult = results[0].attributes;
            if (!aniresult.titles) throw "No result found.";
            client.logger.debug("Result has been found.");
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
            anifound = anititle ? true : false;
          } catch (ex) {
            client.logger.debug(`Something went wrong: ${ex.message}`);
            // ¯\_(ツ)_/¯
          }
        });
      }
      break;
    case "manga":
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