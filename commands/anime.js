// Search Kitsu for an anime
const { ApplicationCommandOptionType } = require("discord.js");
const kitsu = require("../modules/node-kitsu.js");

exports.run = async (interaction) => {
  const aniname = interaction.options.getString("title");
  if (!aniname) return interaction.reply({ "content": "Please specify an anime name.", "ephemeral": true });
  await interaction.deferReply();
  interaction.client.logger.debug(`Search started for search term "${aniname}"`);
  let results;
  try {
    results = await kitsu.searchAnime(aniname, 0);
  } catch (ex) {
    if (ex.message.indexOf("ERR_UNESCAPED_CHARACTERS") != -1) {
      return interaction.editReply("This command only accepts English and Romaji titles. Please translate the title and try again.");
    } else {
      interaction.editReply("An error occurred running this command. Please try again later.");
    }
    return interaction.client.logger.error(`${ex}`);
  }
  if (!results || !results[0]) {
    interaction.editReply("No results found");
    interaction.client.logger.warn(`No anime found for search term "${aniname}"`);
    return;
  }
  const aniresult = results[0].attributes;

  const embed = {
    "title": aniresult.titles.en || aniresult.canonicalTitle || aniresult.titles.en_jp,
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
  interaction.editReply({ "embeds": [embed] });
  interaction.client.logger.log(`Result found for search term "${aniname}": "${aniresult.titles.en || aniresult.canonicalTitle || aniresult.titles.en_jp}"`);
};

exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "User",
  options: [
    {
      name: "title",
      description: "An anime title",
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ]
};

exports.help = {
  name: "anime",
  category: "Kitsu",
  description: "Show information about an anime on Kitsu.",
  usage: "anime [name]"
};