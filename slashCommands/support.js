// Gives users instructions for getting help with the bot
exports.run = async (interaction) => {
  const embed = { 
    "title": "Support Instructions",
    "description": "Having trouble with the bot? You can get help about a specific command with `/help`. If you think you've found a bug, you can report it [on GitHub](https://github.com/JacenBoy/michelle/issues), by contacting me [on Twitter](https://twitter.com/jacenboy), or by joining the [official support server](https://discord.gg/6wgy6jE).",
    "color": interaction.client.colorInt("#fca2cd")
  };
  interaction.reply({embeds: [embed], ephemeral: true});
};
  
exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "User",
  options: []
};
  
exports.help = {
  name: "support",
  category: "System",
  description: "Get instructions for reporting bugs or other assistance with the bot.",
  usage: "support"
};
  