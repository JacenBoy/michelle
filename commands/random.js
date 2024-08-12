// Get a random anime
const { ApplicationCommandOptionType } = require("discord.js");
const kitsu = require("../modules/node-kitsu.js");
const VNDB = require("vndb-api");
const { DateTime } = require("luxon");

exports.run = async (interaction) => {
  const mediaType = interaction.options.getString("type");
  if (!mediaType) return interaction.reply({ content: "Missing argument. Please specify \"anime\", \"manga\", or \"visual novel\".", ephemeral: true });
  await interaction.deferReply();
  let embed;
  let found = false;
  switch (mediaType) {
    case "anime":
      while (!found) {
        const rnd = interaction.client.randInt(0, 100000);
        let results;
        let aniresult;
        try {
          results = await kitsu.listAnime(rnd);
        } catch (ex) {
          interaction.editReply("An error occurred running this command. Please try again later.");
          found = true;
          return interaction.client.logger.error(`An error occurred with the command: ${ex}`);
        }
        try {
          aniresult = results[0].attributes;
          if (!aniresult.titles) throw "No result found";
          embed = {
            "title": aniresult.canonicalTitle || aniresult.titles.en || aniresult.titles.en_jp,
            "url": `https://kitsu.io/anime/${aniresult.slug}`,
            "description": interaction.client.cleanSyn(aniresult.synopsis),
            "color": interaction.client.colorInt("#fd8320"),
            "image": { "url": aniresult.posterImage.small },
            "fields": [
              { "name": "Rating:", "value": `${aniresult.averageRating || 0}% Approval`, "inline": true },
              { "name": "Episodes:", "value": `${aniresult.episodeCount || 0} (${aniresult.subtype})`, "inline": true },
              { "name": "Status:", "value": aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`, "inline": true }
            ]
          };
          interaction.client.logger.log(`Anime sucesfully generated: ${embed.title}`);
          found = true;
        } catch (ex) {
          // ¯\_(ツ)_/¯
          interaction.client.logger.warn("Randomizing anime failed. Retrying.");
          await interaction.client.wait(1000);
        }
      }
      break;
    case "manga":
      while (!found) {
        const rnd = interaction.client.randInt(0, 100000);
        let results;
        let aniresult;
        try {
          results = await kitsu.listManga(rnd);
        } catch (ex) {
          interaction.editReply("An error occurred running this command. Please try again later.");
          found = true;
          return interaction.client.logger.error(`An error occurred with the command: ${ex}`);
        }
        try {
          aniresult = results[0].attributes;
          if (!aniresult.titles) throw "No result found";
          embed = {
            "title": aniresult.canonicalTitle || aniresult.titles.en || aniresult.titles.en_jp,
            "url": `https://kitsu.io/manga/${aniresult.slug}`,
            "description": interaction.client.cleanSyn(aniresult.synopsis),
            "color": interaction.client.colorInt("#fd8320"),
            "image": { "url": aniresult.posterImage.small },
            "fields": [
              { "name": "Rating:", "value": `${aniresult.averageRating || 0}% Approval`, "inline": true },
              { "name": "Chapters:", "value": `${aniresult.episodeCount || 0} (${aniresult.subtype})`, "inline": true },
              { "name": "Status:", "value": aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`, "inline": true }
            ]
          };
          interaction.client.logger.log(`Manga sucesfully generated: ${embed.title}`);
          found = true;
        } catch (ex) {
          // ¯\_(ツ)_/¯
          interaction.client.logger.warn("Randomizing manga failed. Retrying.");
          await interaction.client.wait(1000);
        }
      }
      break;
    case "vn":
      while (!found) {
        let results;
        let vnresult;
        let langs;
        let plats;
        try {
          const vndb = new VNDB("michelle-vndb");
          const dbinfo = await vndb.query("dbstats");
          const rnd = interaction.client.randInt(1, dbinfo.vn);
          results = await vndb.query(`get vn basic,details (id = ${rnd})`);
        } catch (ex) {
          interaction.editReply("An error occurred running this command. Please try again later.");
          found = true;
          return interaction.client.logger.error(`An error occurred with the command:\n${JSON.stringify(ex)}`);
        }
        try {
          vnresult = results.items[0];
          if (!vnresult.title) throw "No result found";

          langs = [];
          plats = [];
          for (let i = 0; i < vnresult.languages.length; i++) {
            const lang = await interaction.client.getEmoji(vnresult.languages[i]);
            if (!lang) langs[i] = vnresult.languages[i];
            else langs[i] = lang;
          }
          for (let i = 0; i < vnresult.platforms.length; i++) {
            const platform = await interaction.client.getEmoji(vnresult.platforms[i]);
            if (!platform) plats[i] = vnresult.platforms[i];
            else plats[i] = platform;
          }

          embed = {
            "title": vnresult.title,
            "url": `https://vndb.org/v${vnresult.id}`,
            "description": interaction.client.cleanSyn(vnresult.description),
            "color": interaction.client.colorInt("#071c30"),
            "image": { "url": vnresult.image_nsfw ? (interaction.channel.nsfw ? vnresult.image : "https://michelle.jacenboy.com/assets/nsfw-overlay.png") : vnresult.image },
            "fields": [
              { "name": "Release Date", "value": DateTime.fromISO(vnresult.released).toFormat("MMM d',' yyyy") },
              { "name": "Languages", "value": langs.join(" ") },
              { "name": "Platforms", "value": plats.join(" ") }
            ]
          };
          interaction.client.logger.log(`VN sucesfully generated: ${embed.title}`);
          found = true;
        } catch (ex) {
          // ¯\_(ツ)_/¯
          interaction.client.logger.warn("Randomizing VN failed. Retrying.");
          await interaction.client.wait(1000);
        }
      }
      break;
    default:
      return interaction.editReply("Invalid argument. Please specify \"anime\", \"manga\", or \"visual novel\".");
  }
  interaction.editReply({ "embeds": [embed] });
};

exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "User",
  options: [
    {
      name: "type",
      description: "The type of media to generate",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Anime",
          value: "anime"
        },
        {
          name: "Manga",
          value: "manga"
        },
        {
          name: "Visual Novel",
          value: "vn"
        }
      ]
    }
  ]
};

exports.help = {
  name: "random",
  category: "Kitsu",
  description: "Get information about a random anime or manga.",
  usage: "random [anime/manga]"
};