const { DateTime } = require("luxon");
const Special = require("../models/special.js");

exports.run = async (client, message, args, level) => {
  if (!message.mentions.users.first()) return;
  var fields = [];
  var i = 0;
  var users = message.mentions.users.values();
  for (let u of users) {
    if ([].includes(message.author.id)) u = message.author;
    const profile = await Special.findById(u.id);
    client.logger.debug(Object.keys(profile.horny).length);
    if (!profile || !Object.keys(profile.horny).length) {
      const res = await Special.findByIdAndUpdate(u.id, {"horny": {"totalCount": 1, "lastTime": DateTime.now().toString()}}, {upsert: true, new: true});
      fields[i] = {
        "name": `${u.username} horny count: ${res.horny.totalCount}`, 
        "value": `This is the first recorded time ${u.username} has been horny`
      };
    } else {
      const res = await Special.findByIdAndUpdate(u.id, {"horny": {"totalCount": profile.horny.totalCount + 1, "lastTime": DateTime.now().toString()}}, {upsert: true, new: true});
      const diff = DateTime.now().diff(DateTime.fromISO(profile.horny.lastTime), ["days", "hours", "minutes", "seconds", "milliseconds"]);
      fields[i] = {
        "name": `${u.username} horny count: ${res.horny.totalCount}`,
        "value": `It has been ${diff.days ? diff.days + " days " : ""}${diff.hours ? diff.hours + " hours " : ""}${diff.minutes ? diff.minutes + " minutes " : ""}${diff.seconds ? diff.seconds + " seconds " : ""}since ${u.username} was last horny`
      };
    }
    i++;
  }

  const embed = {
    "fields": fields,
    "color": client.colorInt("#ff0000")
  };
  message.channel.send({"embeds": [embed]});
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
