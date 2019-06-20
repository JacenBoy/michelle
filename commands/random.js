// Get a random anime

exports.run = async (client, message, args, level) => {
  const kitsu = require("node-kitsu");
  if (!args[0]) return message.channel.send("Missing argument. Please specify either anime or manga.");
  var embed;
  var msg;
  var found = false;
  switch (args[0].toLowerCase()) {
    case "anime":
      var msg = await message.channel.send("Please wait a moment...");
      while (!found) {
        var rnd = client.randInt(0,100000);
        try {
          var results = await kitsu.listAnime(rnd);
        } catch (ex) {
          message.channel.send("An error occured running this command. This is likely due to an issue on Kitsu's end, and not an error with the bot. Please try your command again later.");
          found = true;
          return client.logger.error(`An error occurred with the command: ${ex}`);
        }
        try {
          var aniresult = results[0].attributes;
          if (!aniresult.titles) throw "No result found";
          embed = { "embed": {
            "title": aniresult.canonicalTitle || aniresult.titles.en || aniresult.titles.en_jp,
            "url": `https://kitsu.io/anime/${aniresult.slug}`,
            "description": client.cleanSyn(aniresult.synopsis),
            "color": client.colorInt("#fd8320"),
            "image": { "url": aniresult.posterImage.small },
            "fields": [
              { "name": "Rating:", "value": `${aniresult.averageRating || 0}% Approval`, "inline": true },
              { "name": "Episodes:", "value":  `${aniresult.episodeCount || 0} (${aniresult.subtype})`, "inline": true },
              { "name": "Status:", "value": aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`, "inline": true }
            ]
          } };
          client.logger.log(`Anime sucesfully generated: ${embed.embed.title}`);
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
        try {
          var results = await kitsu.listManga(rnd);
        } catch (ex) {
          message.channel.send("An error occured running this command. This is likely due to an issue on Kitsu's end, and not an error with the bot. Please try your command again later.");
          found = true;
          return client.logger.error(`An error occurred with the command: ${ex}`);
        }
        try {
          var aniresult = results[0].attributes;
          if (!aniresult.titles) throw "No result found";
          embed = { "embed": {
            "title": aniresult.canonicalTitle || aniresult.titles.en || aniresult.titles.en_jp,
            "url": `https://kitsu.io/manga/${aniresult.slug}`,
            "description": client.cleanSyn(aniresult.synopsis),
            "color": client.colorInt("#fd8320"),
            "image": { "url": aniresult.posterImage.small },
            "fields": [
              { "name": "Rating:", "value": `${aniresult.averageRating || 0}% Approval`, "inline": true },
              { "name": "Chapters:", "value":  `${aniresult.episodeCount || 0} (${aniresult.subtype})`, "inline": true },
              { "name": "Status:", "value": aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`, "inline": true }
            ]
          } };
          client.logger.log(`Manga sucesfully generated: ${embed.embed.title}`);
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
  special: false,
  aliases: ["rand"],
  permLevel: "User"
};

exports.help = {
  name: "random",
  category: "Kitsu",
  description: "Get information about a random anime or manga.",
  usage: "random [anime/manga]"
};