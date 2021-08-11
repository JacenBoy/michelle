exports.run = async (interaction) => {
  await interaction.deferReply();
  const reply = await interaction.editReply("Pinging Discord");
  await interaction.editReply(`Reply from Discord: time=${reply.createdTimestamp - interaction.createdTimestamp}ms api-latency=${Math.round(interaction.client.ws.ping)}ms`);
};

exports.conf = {
  enabled: true,
  global: false,
  special: false,
  aliases: [],
  permLevel: "User",
  options: []
};

exports.help = {
  "name": "ping",
  "description": "Tests latency between the bot and Discord."
};