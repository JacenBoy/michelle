const {ApplicationCommandOptionType} = require("discord.js");
const { DateTime } = require("luxon");
const Special = require("../models/special.js");

exports.run = async (interaction) => {
  let target = interaction.options.getUser("user");
  if (!target) return;
  if ([].includes(interaction.user.id)) target = interaction.user;
  const profile = await Special.findById(target.id);
  let embed;
  if (!profile || !Object.keys(profile.horny).length) {
    const res = await Special.findByIdAndUpdate(target.id, {"horny": {"totalCount": 1, "lastTime": DateTime.now().toString()}}, {upsert: true, new: true});
    embed = {
      "title": `${target.username} was caught being horny!`, 
      "description": `${target.username} horny count: ${res.horny.totalCount}\nThis is the first recorded time ${target.username} has been horny`,
      "color": interaction.client.colorInt("#ff0000")
    };
  } else {
    const res = await Special.findByIdAndUpdate(target.id, {"horny": {"totalCount": profile.horny.totalCount + 1, "lastTime": DateTime.now().toString()}}, {upsert: true, new: true});
    const diff = DateTime.now().diff(DateTime.fromISO(profile.horny.lastTime), ["days", "hours", "minutes", "seconds", "milliseconds"]);
    embed = {
      "title": `${target.username} was caught being horny!`,
      "description": `${target.username} horny count: ${res.horny.totalCount}\nIt has been ${diff.days ? diff.days + " days " : ""}${diff.hours ? diff.hours + " hours " : ""}${diff.minutes ? diff.minutes + " minutes " : ""}${diff.seconds ? diff.seconds + " seconds " : ""}since ${target.username} was last horny`,
      "color": interaction.client.colorInt("#ff0000")
    };
  }
  interaction.reply({"embeds": [embed]});
};

exports.conf = {
  enabled: true,
  global: false,
  special: ["411027224389615617", "140308655856680960"],
  permLevel: "User",
  options: [
    {
      name: "user",
      description: "The user to target",
      type: ApplicationCommandOptionType.User,
      required: true
    }
  ]
};

exports.help = {
  name: "horny",
  category: "Entertainment",
  description: "Find the last time a user was horny.",
  usage: "horny [user tag]"
};
