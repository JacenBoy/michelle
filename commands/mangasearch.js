// Search Kitsu for multiple manga
const kitsu = require("node-kitsu");

exports.run = async (interaction) => {
  const aniname = interaction.options.getString("title");
  if (!aniname) return interaction.reply({"content": "Please specify a manga name.", "ephemeral": true});
  await interaction.deferReply();
  interaction.client.logger.debug(`Search started for search term "${aniname}"`);
  let results;
  try {
    results = await kitsu.searchManga(aniname, 0);
  } catch (ex) {
    if (ex.message.indexOf("ERR_UNESCAPED_CHARACTERS") != -1) {
      interaction.editReply("This command only accepts English and Romaji titles. Please translate the title and try again.");
    } else {
      interaction.editReply("An error occurred running this command. Please try again later.");
    }
    return interaction.client.logger.error(`${ex}`);
  }
  if (!results || !results[0]) {
    interaction.editReply("No results found");
    interaction.client.logger.warn(`No manga found for search term "${aniname}"`);
    return;
  }
  const fieldarry = [];
  for (let i=0;i<results.length;i++) {
    const aniresult = results[i].attributes;
    fieldarry[i] = {
      "name": aniresult.titles.en || aniresult.canonicalTitle || aniresult.titles.en_jp,
      "value": `Rating: ${aniresult.averageRating || 0}%\nChapters: ${aniresult.chapterCount || 0}\nStatus: ${aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`}\n[Kitsu.io](https://kitsu.io/manga/${aniresult.slug})`
    };
  }

  const embed = { 
    "title": "Search Results", 
    "description": "\u200b", 
    "color": interaction.client.colorInt("#fd8320"), 
    "fields": fieldarry 
  };
  interaction.editReply({"embeds": [embed]});
  interaction.client.logger.log(`Results found for search term "${aniname}"`);
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
  name: "mangasearch",
  category: "Kitsu",
  description: "List the top ten results for a manga.",
  usage: "mangasearch [name]"
};