/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Get a random anime

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Missing argument. Please specify either anime or manga.");
  var embed;
  var found = false;
  switch (args[0].toLowerCase()) {
    case "anime":
      while (!found) {
        var rnd = client.randInt(0,100000);
        var results = await client.kitsu.listAnime(rnd);
        try {
          var aniresult = results[0].attributes;
          if (!aniresult.titles) throw "No result found";
          var anititle = aniresult.titles.en || aniresult.titles.en_jp || aniresult.canonicalTitle;
          var anirating = aniresult.averageRating || 0;
          var epcount = aniresult.episodeCount || 0;
          var anistatus = aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`;
          var strsyn = aniresult.synopsis == "" ? "No synopsis available" : aniresult.synopsis;
          if (strsyn.length >= 1024) {
            strsyn = strsyn.substring(0, strsyn.lastIndexOf(" ", 1017)) + " (more)";
          }
          embed = { "embed": {
            "title": anititle,
            "url": `https://kitsu.io/anime/${aniresult.slug}`,
            "description": strsyn,
            "image": { "url": aniresult.posterImage.small },
            "fields": [
              { "name": "Rating:", "value": `${anirating}% Approval`, "inline": true },
              { "name": "Episodes:", "value":  `${epcount.toString()} (${aniresult.subtype})`, "inline": true },
              { "name": "Status:", "value": anistatus, "inline": true }
            ]
          } };
          client.logger.log(`Anime sucesfully generated: ${anititle}`);
          found = true;
        } catch (ex) {
          // ¯\_(ツ)_/¯
          client.logger.warn("Randomizing failed. Retrying.");
        }
      }
      break;
    case "manga":
    while (!found) {
      var rnd = client.randInt(0,100000);
      var results = await client.kitsu.listManga(rnd);
      try {
        var aniresult = results[0].attributes;
        if (!aniresult.titles) throw "No result found";
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
          "url": `https://kitsu.io/manga/${aniresult.slug}`,
          "description": strsyn,
          "image": { "url": aniresult.posterImage.small },
          "fields": [
            { "name": "Rating:", "value": `${anirating}% Approval`, "inline": true },
            { "name": "Chapters:", "value":  `${epcount.toString()} (${aniresult.subtype})`, "inline": true },
            { "name": "Status:", "value": anistatus, "inline": true }
          ]
        } };
        client.logger.log(`Manga sucesfully generated: ${anititle}`);
        found = true;
      } catch (ex) {
        // ¯\_(ツ)_/¯
        client.logger.warn("Randomizing failed. Retrying.");
      }
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
  aliases: ["rand"],
  permLevel: "User"
};

exports.help = {
  name: "random",
  category: "Kitsu",
  description: "Get information about a random anime or manga.",
  usage: "random [anime/manga]"
};