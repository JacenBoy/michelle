const Special = require("../models/special.js");
const { DateTime } = require("luxon");

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send(`Improper usage. Use \`${client.getSettings(message.guild.id).prefix}help check\` for assistance.`);
  var embed;
  switch (args[0].toLowerCase()) {
    case "horny":
      if (!message.mentions.users.first()) var users = [message.author];
      else var users = message.mentions.users.array();
      var fields = [];
      var i = 0;

      for (const u of users) {
        const profile = await Special.findById(u.id);
        if (!profile) {
          fields[i] = {
            "name": `${u.username} horny count: 0`, 
            "value": `There have been no recorded instances of ${u.username} being horny`
          };
        }
        else if (!profile.horny) {
          fields[i] = {
            "name": `${u.username} horny count: 0`, 
            "value": `There have been no recorded instances of ${u.username} being horny`
          };
        } else {
          const diff = DateTime.now().diff(DateTime.fromISO(profile.horny.lastTime), ["days", "hours", "minutes", "seconds", "milliseconds"]);
          fields[i] = {
            "name": `${u.username} horny count: ${profile.horny.totalCount}`, 
            "value": `It has been ${diff.days ? diff.days + " days " : ""}${diff.hours ? diff.hours + " hours " : ""}${diff.minutes ? diff.minutes + " minutes " : ""}${diff.seconds ? diff.seconds + " seconds " : ""}since ${u.username} was last horny`
          };
        }
        i++;
      }
      embed = {"embed": {
        "fields": fields, 
        "color": client.colorInt("#ff0000")
      }};
      message.channel.send({"embeds": [embed]});
      break;
    case "abuse":
      if (!message.mentions.users.first()) var users = [message.guild.owner];
      else var users = message.mentions.users.array();
      var fields = [];
      var i = 0;

      for (const u of users) {
        const profile = await Special.findById(u.id);
        if (!profile) {
          fields[i] = {
            "name": "\u200b", 
            "value": `<@${u.id}> has never been accused of abuse`
          };
        } else {
          if (!profile.abuse) {
            fields[i] = {
              "name": "\u200b", 
              "value": `<@${u.id}> has never been accused of abuse`
            };
          }
          else {
            fields[i] = {
              "name": "\u200b", 
              "value": `<@${u.id}> has been accused of abuse ${profile.abuse} time${profile.abuse > 1 ? "s" : "" }`
            };
          }
        }
        i++;
      }
      embed = {"embed": {
        "fields": fields, 
        "color": client.colorInt("#ff0000")
      }};
      message.channel.send({"embeds": [embed]});
      break;
    case "gratitude":
      if (!message.mentions.users.first()) var users = [message.guild.owner];
      else var users = message.mentions.users.array();
      var fields = [];
      var i = 0;

      for (const u of users) {
        const profile = await Special.findById(u.id);
        if (!profile) {
          fields[i] = {
            "name": "\u200b", 
            "value": `<@${u.id}> has never been thanked`
          };
        } else {
          if (!profile.gratitude) {
            fields[i] = {
              "name": "\u200b", 
              "value": `<@${u.id}> has never been thanked`
            };
          }
          else {
            fields[i] = {
              "name": "\u200b", 
              "value": `<@${u.id}> has been thanked ${profile.gratitude} time${profile.gratitude > 1 ? "s" : "" }`
            };
          }
        }
        i++;
      }

      embed = {"embed": {
        "fields": fields, 
        "color": client.colorInt("#00ff00")
      }};
      message.channel.send({"embeds": [embed]});
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