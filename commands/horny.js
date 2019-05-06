const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args, level) => {
  if (client.config.specialServers.indexOf(message.guild.id) == -1) return;
  if (!message.mentions.users.first()) return;
  const user = message.mentions.first();
  if (!client.horny.has(user.id)) {
    client.horny.set(user.id, moment());
    message.channel.send(`This is the first officially recorded time ${user.username} has been horny`);
  } else {
    message.channel.send(`It has been ${moment.duration(moment().diff(client.horny.get(user.id))).format(" D [days], H [hrs], m [mins], s [secs]")} since ${user.username} was last horny.`);
    client.horny.set(user.id, moment());
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "horny",
  category: "Entertainment",
  description: "Find the last time a user was horny.",
  usage: "horny [user tag]"
};