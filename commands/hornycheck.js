const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args, level) => {
  if (client.config.specialServers.indexOf(message.guild.id) == -1) return;
  if (!message.mentions.users.first()) return;
  var fields = [];
  var i = 0;
  message.mentions.users.array().forEach(u => {
    if (!client.horny.has(u.id)) {
      fields[i] = {
        "name": `${u.username} horny count: 0`, 
        "value": `There have been no recorded instances of ${u.username} being horny`
      };
    } else {
      const udata = client.horny.get(u.id);
      fields[i] = {
        "name": `${u.username} horny count: ${udata.totalCount}`, 
        "value": `It has been ${moment.duration(moment().diff(udata.lastTime)).format("D [days] H [hours] m [minutes] s [seconds]")} since ${u.username} was last horny`
      };
    }
    i++;
  });
  message.channel.send({"embed": {
    "fields": fields, 
    "color": client.colorInt("#ff0000")
  }});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  special: true,
  aliases: ["hc"],
  permLevel: "User"
};

exports.help = {
  name: "hornycheck",
  category: "Entertainment",
  description: "Find the last time a user was horny.",
  usage: "hc [user tag]"
};
