/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Gives users instructions for getting help with the bot
exports.run = async (client, message, args, level) => {
  const embed = { "embed": { 
    "title": "Support Instructions",
    "description": `Having trouble with the bot? You can get help about a specific command with \`${client.getSettings(message.guild.id).prefix}help\`. If you think you've found a bug, you can report it [on GitHub](https://github.com/JacenBoy/michelle/issues), by contacting me [on Twitter](https://twitter.com/jacenboy), or by joining the [official support server](https://discord.gg/6wgy6jE).`
  } }
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: "support",
  category: "System",
  description: "Get instructions for reporting bugs or other assistance with the bot.",
  usage: "support"
};
  