exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send(`Improper usage. Use \`${client.getSettings(message.guild.id).prefix}help check\` for assistance.`);
  switch (args[0].toLowerCase()) {
    case "horny":
      if (!message.mentions.users.first()) var users = [message.author];
      else var users = message.mentions.users.array();
      var fields = [];
      var i = 0;
      const moment = require("moment");
      require("moment-duration-format");

      users.forEach(u => {
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
      break;
    case "abuse":
      if (!message.mentions.users.first()) var users = [message.guild.owner];
      else var users = message.mentions.users.array();
      var fields = [];
      var i = 0;

      users.forEach(u => {
        if (!client.owners.has(u.id)) {
          fields[i] = {
            "name": "\u200b", 
            "value": `<@${u.id}> has never been accused of abuse`
          };
        } else {
          const udata = client.owners.get(u.id);
          if (udata.abuse == 0) {
            fields[i] = {
              "name": "\u200b", 
              "value": `<@${u.id}> has never been accused of abuse`
            };
          }
          else {
            fields[i] = {
              "name": "\u200b", 
              "value": `<@${u.id}> has been accused of abuse ${udata.abuse} time${udata.abuse > 1 ? "s" : "" }`
            };
          }
        }
        i++;
      });
      message.channel.send({"embed": {
        "fields": fields, 
        "color": client.colorInt("#ff0000")
      }});
      break;
    case "gratitude":
      if (!message.mentions.users.first()) var users = [message.guild.owner];
      else var users = message.mentions.users.array();
      var fields = [];
      var i = 0;

      users.forEach(u => {
        if (!client.owners.has(u.id)) {
          fields[i] = {
            "name": "\u200b", 
            "value": `<@${u.id}> has never been thanked`
          };
        } else {
          const udata = client.owners.get(u.id);
          if (udata.gratitude == 0) {
            fields[i] = {
              "name": "\u200b", 
              "value": `<@${u.id}> has never been thanked`
            };
          }
          else {
            fields[i] = {
              "name": "\u200b", 
              "value": `<@${u.id}> has been thanked ${udata.gratitude} time${udata.gratitude > 1 ? "s" : "" }`
            };
          }
        }
        i++;
      });
      message.channel.send({"embed": {
        "fields": fields, 
        "color": client.colorInt("#00ff00")
      }});
      break;
    default:
      return message.channel.send(`Improper usage. Use \`${client.getSettings(message.guild.id).prefix}help check\` for assistance.`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  special: true,
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: "check",
  category: "Entertainment",
  description: "Check data for m-horny, m-abuse, and m-gratitude",
  usage: "check [horny/abuse/gratitude] [user tag]"
};