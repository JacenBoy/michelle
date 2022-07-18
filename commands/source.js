// Find the source of an image
const {ApplicationCommandOptionType} = require("discord.js");
const checkImage = require("is-image-url");
const Sagiri = require("sagiri");

exports.run = async (interaction) => {
  const saucenao = Sagiri(interaction.client.config.saucetoken, {"results": 1});
  const img = interaction.options.getString("link");

  if (!checkImage(img)) {
    interaction.reply({content: "The URL you specified is not an image. Please check your URL.", ephemeral: true});
    interaction.client.logger.warn("Invalid URL specified.");
    return;
  }
  await interaction.deferReply();

  const results = await saucenao(img);

  const embed = {
    "title": results[0].raw.data.title || `Image from ${results[0].site}`,
    "url": results[0].url,
    "color": interaction.client.colorInt("#1d1d1d"),
    "image": { "url": results[0].thumbnail },
    "fields": [
      { "name": "Similarity", "value": `${results[0].similarity}` },
      { "name": results[0].raw.data.anidb_aid ? "Anime" : "Artist", "value": `${results[0].raw.data.anidb_aid ? results[0].raw.data.source : results[0].raw.data.creator || `${results[0].raw.data.member_name} (${results[0].raw.data.member_id})`}` }
    ]
  };
  interaction.editReply({"embeds": [embed]});
  interaction.client.logger.log(`Result from ${results[0].site} found for ${img}`);
};

exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "User",
  options: [
    {
      name: "link",
      description: "The link to an image",
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ]
};

exports.help = {
  name: "source",
  category: "Fanart",
  description: "Get the cource of an image from its URL",
  usage: "sauce [image url]"
};