// Command Description
const Special = require("../models/special.js");

exports.run = async (client, message, args, level) => {
  if (message.mentions.users.first()) var owner = message.mentions.users.first();
  else var owner = message.guild.owner;

  if (owner.id == message.author.id) return;

  const profile = await Special.findById(owner.id) || {"gratitude": 0};
  const res = await Special.findByIdAndUpdate(owner.id, {"gratitude": profile.gratitude ? profile.gratitude + 1 : 1}, {upsert: true, new: true});

  const embed = {
    "description": `Thank you <@${owner.id}> for everything you do! <@${owner.id}> has been thanked ${res.gratitude} time${res.gratitude > 1 ? "s" : "" }`,
    "color": client.colorInt("#00ff00")
  };
  message.channel.send({"embeds": [embed]});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  special: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "gratitude",
  category: "Entertainment",
  description: "Show your appreciation for a server owner",
  usage: "gratitude"
};