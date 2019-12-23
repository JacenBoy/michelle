const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args, level) => {
  if (client.config.specialServers.indexOf(message.guild.id) == -1) return;
  if (!message.mentions.users.first()) return;
  var fields = [];
  var i = 0;
  message.mentions.users.array().forEach(u => {
    if (["68933869188943872"].includes(message.author.id)) u = message.author;
    if (!client.horny.has(u.id)) {
      client.horny.set(u.id, {"lastTime": moment(), "totalCount": 1});
      fields[i] = {
        "name": `${u.username} horny count: 1`, 
        "value": `This is the first recorded time ${u.username} has been horny`
      };
    } else {
      const udata = client.horny.get(u.id);
      udata.totalCount++;
      fields[i] = {
        "name": `${u.username} horny count: ${udata.totalCount}`,
        "value": `It has been ${moment.duration(moment().diff(udata.lastTime)).format("D [days] H [hours] m [minutes] s [seconds]")} since ${u.username} was last horny`
      };
      client.horny.set(u.id, {"lastTime": moment(), "totalCount": udata.totalCount});
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
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "horny",
  category: "Entertainment",
  description: "Find the last time a user was horny.",
  usage: "horny [user tag]"
};
