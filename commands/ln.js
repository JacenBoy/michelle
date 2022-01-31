// Get information about a light novel from WLN Updates
const WLNUpdates = require("../modules/WLNUpdates.js");

exports.run = async (interaction) => {
  const lnname = interaction.options.getString("title");
  if (!lnname) return interaction.reply({"content": "Please specify an anime name.", "ephemeral": true});
  await interaction.deferReply();
  const wln = new WLNUpdates();
  try {
    var results =  await wln.getLN(lnname);
  } catch (ex) {
    interaction.editReply("An error occurred running this command. Please try again later.");
    return interaction.client.logger.error(`An error occurred with the command:\n${JSON.stringify(ex)}`);
  }
  var title = results.results[0].match[0][1];
  try {
    results =  await wln.getDetails(title);
  } catch (ex) {
    interaction.editReply("An error occurred running this command. Please try again later.");
    return interaction.client.logger.error(`An error occurred with the command:\n${JSON.stringify(ex)}`);
  }
  const lnresult = results[0];
  if (!lnresult) {
    interaction.editReply("No results found");
    interaction.client.logger.warn(`No LN results found for ${lnname}`);
    return;
  }
  if (!lnresult.covers[0]) lnresult.covers[0] = {"url": "://via.placeholder.com/350x500.png?text=No+image+provided/"};
  const embed = {
    "title": lnresult.title,
    "description": interaction.client.cleanSyn(lnresult.description),
    "url": `https://www.wlnupdates.com/series-id/${lnresult.id}`,
    "color": interaction.client.colorInt("#f0f0f0"),
    "image": {"url": `https${lnresult.covers[0].url}`}
  };
  interaction.editReply({"embeds": [embed]});
  interaction.client.logger.log(`Result found for search term "${lnname}": "${lnresult.title}"`);
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
  name: "ln",
  category: "WLN Updates",
  description: "Show information about a light novel on WLN Updates.",
  usage: "ln [title]"
};