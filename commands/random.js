// Get a random anime
const kitsu = require("node-kitsu");
const VNDB = require("vndb-api");
const moment = require("moment");

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Missing argument. Please specify \"anime\", \"manga\", or \"VN\".");
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
          message.channel.send("An error occurred running this command. Please try again later.");
          found = true;
          return client.logger.error(`An error occurred with the command: ${ex}`);
        }
        try {
          var aniresult = results[0].attributes;
          if (!aniresult.titles) throw "No result found";
          embed = {
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
          };
          client.logger.log(`Anime sucesfully generated: ${embed.title}`);
          found = true;
        } catch (ex) {
          // ¯\_(ツ)_/¯
          client.logger.warn("Randomizing anime failed. Retrying.");
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
          message.channel.send("An error occurred running this command. Please try again later.");
          found = true;
          return client.logger.error(`An error occurred with the command: ${ex}`);
        }
        try {
          var aniresult = results[0].attributes;
          if (!aniresult.titles) throw "No result found";
          embed = {
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
          };
          client.logger.log(`Manga sucesfully generated: ${embed.title}`);
          found = true;
        } catch (ex) {
          // ¯\_(ツ)_/¯
          client.logger.warn("Randomizing manga failed. Retrying.");
          await client.wait(1000);
        }
      }
      break;
    case "vn":
      var msg = await message.channel.send("Please wait a moment...");
      while (!found) {
        try {
          const vndb = new VNDB("michelle-vndb");
          const dbinfo = await vndb.query("dbstats");
          var rnd = client.randInt(1,dbinfo.vn);
          var results = await vndb.query(`get vn basic,details (id = ${rnd})`);
        } catch (ex) {
          message.channel.send("An error occurred running this command. Please try again later.");
          found = true;
          return client.logger.error(`An error occurred with the command:\n${JSON.stringify(ex)}`);
        }
        try {
          var vnresult = results.items[0];
          if (!vnresult.title) throw "No result found";

          var langs = [];
          var plats = [];
          for (let i = 0; i < vnresult.languages.length; i++) {
            const lang = await client.getEmoji(vnresult.languages[i]);
            if (!lang) langs[i] = vnresult.languages[i];
            else langs[i] = lang;
          }
          for (let i = 0; i < vnresult.platforms.length; i++) {
            const platform = await client.getEmoji(vnresult.platforms[i]);
            if (!platform) plats[i] = vnresult.platforms[i];
            else plats[i] = platform;
          }

          embed = {
            "title": vnresult.title,
            "url": `https://vndb.org/v${vnresult.id}`,
            "description": client.cleanSyn(vnresult.description),
            "color": client.colorInt("#071c30"),
            "image": {"url": vnresult.image_nsfw ? (message.channel.nsfw ? vnresult.image : "https://michelle.jacenboy.com/assets/nsfw-overlay.png") : vnresult.image},
            "fields": [
              {"name": "Release Date", "value": moment(vnresult.released).format("MMM D[,] YYYY")},
              {"name": "Languages", "value": langs.join(" ")},
              {"name": "Platforms", "value": plats.join(" ")}
            ]
          };
          client.logger.log(`VN sucesfully generated: ${embed.title}`);
          found = true;
        } catch (ex) {
          // ¯\_(ツ)_/¯
          client.logger.warn("Randomizing VN failed. Retrying.");
          await client.wait(1000);
        }
      }
      break;
    default:
      return message.channel.send("Invalid argument. Please specify \"anime\", \"manga\", or \"VN\".");
  }
  msg.edit({"content": "", "embed": embed});
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