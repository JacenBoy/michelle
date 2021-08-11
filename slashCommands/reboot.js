exports.run = async (interaction) => {
  await interaction.reply("The bot is shutting down.");
  await Promise.all(interaction.client.commands.map(cmd =>
    interaction.client.unloadCommand(cmd)
  ));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  global: false,
  special: false,
  aliases: ["stop", "shutdown", "restart"],
  permLevel: "Bot Admin",
  options: []
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "reboot"
};