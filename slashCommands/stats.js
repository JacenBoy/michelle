const { version } = require("discord.js");
//const moment = require("moment");
//require("moment-duration-format");

exports.run = (interaction) => {
  //const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const duration = "N/A";
  const embed = {
    title: "Statistics",
    description: `• **Mem Usage**  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• **Uptime**     :: ${duration}
• **Users**      :: ${interaction.client.users.cache.size.toLocaleString()}
• **Servers**    :: ${interaction.client.guilds.cache.size.toLocaleString()}
• **Channels**   :: ${interaction.client.channels.cache.size.toLocaleString()}
• **Version**    :: ${require("../package.json").version}
• **Discord.js** :: v${version}
• **Node**       :: ${process.version}`,
    color: interaction.client.colorInt("#fca2cd")
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
  name: "stats",
  category: "System",
  description: "Gives technical statistics about the bot",
  usage: "stats"
};
