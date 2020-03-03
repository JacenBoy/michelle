exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send("Pinging Discord");
  var pmsg = await msg.edit(`Reply from Discord: time=${msg.createdTimestamp - message.createdTimestamp}ms api-latency=${Math.round(client.ws.ping)}ms`);
  client.logger.debug(pmsg.content);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "System",
  description: "Tests latency between the bot and Discord.",
  usage: "ping"
};
