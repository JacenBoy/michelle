/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Display the current version of the bot.

exports.run = async (client, message, args, level) => {
  const embed = { "embed": {
    "title": "Michelle",
    "description": `Version: ${process.env.npm_package_version}\n[Changelog](https://github.com/JacenBoy/michelle/blob/master/CHANGELOG.md)`
  } };
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ver','v'],
  permLevel: "User"
};

exports.help = {
  name: "Version",
  category: "System",
  description: "Get the current version of the bot.",
  usage: "version"
};