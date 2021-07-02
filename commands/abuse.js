// Command Description
const Special = require("../models/special.js");

exports.run = async (client, message, args, level) => {
  if (message.mentions.users.first()) var owner = message.mentions.users.first();
  else var owner = message.guild.owner;

  //if (owner.id == message.author.id) return;
  
  if (!client.owners.has(owner.id)) client.owners.set(owner.id, {"gratitude": 0, "abuse": 0});

  const profile = await Special.findById(owner.id) || {"abuse": 0};
  const res = await Special.findByIdAndUpdate(owner.id, {"abuse": profile.abuse ? profile.abuse + 1 : 1}, {upsert: true, new: true});

  const odata = client.owners.get(owner.id);
  odata.abuse++;
  client.owners.set(owner.id, odata);

  message.channel.send({"embed": {
    "description": `Rise up against the tyranny of <@${owner.id}>! <@${owner.id}> has been accused of abuse ${res.abuse} time${res.abuse > 1 ? "s" : "" }`,
    "color": client.colorInt("#ff0000")
  }});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  special: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "abuse",
  category: "Entertainment",
  description: "Accuse a server owner of abusing their power",
  usage: "abuse"
};