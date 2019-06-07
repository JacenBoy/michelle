exports.run = async (client, message, args, level) => {
  await message.reply("the bot is shutting down.");
  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  });
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: ["stop", "shutdown", "restart"],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "reboot"
};
