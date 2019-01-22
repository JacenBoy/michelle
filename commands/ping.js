/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Pinging Discord");
  msg.edit(`Reply from Discord: time=${msg.createdTimestamp - message.createdTimestamp}ms api-latency=${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "System",
  description: "Tests latency between the bot and Discord.",
  usage: "ping"
};
