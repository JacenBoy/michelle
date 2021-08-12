// Search for a visual novel on VNDB
const VNDB = require("vndb-api");
const { DateTime } = require("luxon");

exports.run = async (interaction) => {
  const vnname = interaction.options.getString("title");
  if (!vnname) return interaction.reply({"content": "Please specify a visual novel name.", "ephemeral": true});
  await interaction.deferReply();
  try {
    const vndb = new VNDB("michelle-vndb");
    var results = await vndb.query(`get vn basic,details (title~"${vnname}")`);
  } catch (ex) {
    interaction.editReply("An error occurred running this command. Please try again later.");
    return interaction.client.logger.error(`An error occurred with the command:\n${JSON.stringify(ex)}`);
  }
  var vnresult = results.items[0];
  if (!vnresult) {
    interaction.editReply("No results found");
    interaction.client.logger.warn(`No VN results found for ${vnname}`);
    return;
  }

  var langs = [];
  var plats = [];
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

  const embed = {
    "title": vnresult.title,
    "url": `https://vndb.org/v${vnresult.id}`,
    "description": interaction.client.cleanSyn(vnresult.description),
    "color": interaction.client.colorInt("#071c30"),
    "image": {"url": vnresult.image_nsfw ? (interaction.channel.nsfw ? vnresult.image : "https://michelle.jacenboy.com/assets/nsfw-overlay.png") : vnresult.image},
    "fields": [
      {"name": "Release Date", "value": DateTime.fromISO(vnresult.released).toFormat("MMM d',' yyyy")},
      {"name": "Languages", "value": langs.join(" ") || "\u200b"},
      {"name": "Platforms", "value": plats.join(" ") || "\u200b"}
    ]
  };
  interaction.editReply({"embeds": [embed]});
  interaction.client.logger.log(`Result found for search term "${vnname}": "${vnresult.title}"`);
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
      type: "STRING",
      required: true
    }
  ]
};

exports.help = {
  name: "vn",
  category: "VNDB",
  description: "Get information about a visual novel",
  usage: "vn [name]"
};