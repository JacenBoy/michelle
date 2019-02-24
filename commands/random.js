/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Get a random anime

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Missing argument. Please specify either anime or manga.");
  var embed;
  var msg;
  var found = false;
  switch (args[0].toLowerCase()) {
    case "anime":
      var msg = await message.channel.send("Please wait a moment...");
      while (!found) {
        var rnd = client.randInt(0,100000);
        var results = await client.kitsu.listAnime(rnd);
        try {
          var aniresult = results[0].attributes;
          if (!aniresult.titles) throw "No result found";
          embed = { "embed": {
            "title": aniresult.titles.en || aniresult.titles.en_jp || aniresult.canonicalTitle,
            "url": `https://kitsu.io/anime/${aniresult.slug}`,
            "description": client.cleanSyn(aniresult.synopsis),
            "image": { "url": aniresult.posterImage.small },
            "fields": [
              { "name": "Rating:", "value": `${aniresult.averageRating || 0}% Approval`, "inline": true },
              { "name": "Episodes:", "value":  `${aniresult.episodeCount || 0} (${aniresult.subtype})`, "inline": true },
              { "name": "Status:", "value": aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`, "inline": true }
            ]
          } };
          client.logger.log(`Anime sucesfully generated: ${aniresult.titles.en || aniresult.titles.en_jp || aniresult.canonicalTitle}`);
          found = true;
        } catch (ex) {
          // ¯\_(ツ)_/¯
          client.logger.warn("Randomizing failed. Retrying.");
          await client.wait(1000);
        }
      }
      break;
    case "manga":
      var msg = await message.channel.send("Please wait a moment...");
      while (!found) {
        var rnd = client.randInt(0,100000);
        var results = await client.kitsu.listManga(rnd);
        try {
          var aniresult = results[0].attributes;
          if (!aniresult.titles) throw "No result found";
          embed = { "embed": {
            "title": aniresult.titles.en || aniresult.titles.en_jp || aniresult.canonicalTitle,
            "url": `https://kitsu.io/manga/${aniresult.slug}`,
            "description": client.cleanSyn(aniresult.synopsis),
            "image": { "url": aniresult.posterImage.small },
            "fields": [
              { "name": "Rating:", "value": `${aniresult.averageRating || 0}% Approval`, "inline": true },
              { "name": "Chapters:", "value":  `${aniresult.episodeCount || 0} (${aniresult.subtype})`, "inline": true },
              { "name": "Status:", "value": aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`, "inline": true }
            ]
          } };
          client.logger.log(`Manga sucesfully generated: ${aniresult.titles.en || aniresult.titles.en_jp || aniresult.canonicalTitle}`);
          found = true;
        } catch (ex) {
          // ¯\_(ツ)_/¯
          client.logger.warn("Randomizing failed. Retrying.");
          await client.wait(1000);
        }
      }
      break;
    default:
      return message.channel.send("Invalid argument. Please specify either anime or manga.");
  }
  msg.edit(embed);
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