// Display the current version of the bot.

exports.run = async (interaction) => {
  const embed = {
    "title": interaction.client.user.username == "Michelle" ? "Michelle" : `${interaction.client.user.username} (Based on Michelle)`,
    "description": `Version: ${require("../package.json").version}\n[Changelog](https://github.com/JacenBoy/michelle/blob/master/CHANGELOG.md)`,
    "color": interaction.client.colorInt("#fca2cd")
  };
  interaction.reply({"embeds": [embed], ephemeral: true});
};

exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "User",
  options: []
};

exports.help = {
  name: "version",
  category: "System",
  description: "Get the current version of the bot.",
  usage: "version"
};