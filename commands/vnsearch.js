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
  var vnresults = results.items;
  if (!vnresults[0]) {
    interaction.editReply("No results found");
    interaction.client.logger.warn(`No VN found for search term ${vnname}`);
    return;
  }
  var fieldarry = [];
  var langs = [];
  var plats = [];
  for (let i = 0; i < vnresults.length; i++) {
    var vnresult = vnresults[i];
    for (let j = 0; j < vnresult.languages.length; j++) {
      const lang = await interaction.client.getEmoji(vnresult.languages[j]);
      if (!lang) langs[j] = vnresult.languages[j];
      else langs[j] = lang;
    }
    for (let j = 0; j < vnresult.platforms.length; j++) {
      const platform = await interaction.client.getEmoji(vnresult.platforms[j]);
      if (!platform) plats[j] = vnresult.platforms[j];
      else plats[j] = platform;
    }
    fieldarry[i] = {
      "name": vnresult.title,
      "value": `Release Date: ${DateTime.fromISO(vnresult.released).toFormat("MMM d',' yyyy")}\nLanguages: ${langs.join(" ")}\nPlatforms: ${plats.join(", ")}\n[VNDB.org](https://vndb.org/v${vnresult.id})`
    };
  }

  const embed = {
    "title": "Search Results",
    "description": "\u200b",
    "color": interaction.client.colorInt("#071c30"),
    "fields": fieldarry
  };
  interaction.editReply({"embeds": [embed]});
  interaction.client.logger.log(`Result found for search term "${vnname}"`);
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
  name: "vnsearch",
  category: "VNDB",
  description: "List the top ten results for a visual novel.",
  usage: "vnsearch [name]"
};