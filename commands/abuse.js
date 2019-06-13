// Command Description

exports.run = async (client, message, args, level) => {
  const owner = message.guild.owner;
  if (!client.owners.has(owner.id)) client.owners.set(owner.id, {"gratitude": 0, "abuse": 0});

  const odata = client.owners.get(owner.id);
  odata.abuse++;
  client.owners.set(owner.id, odata);

  message.channel.send({"embed": {"description": `Rise up against the tyranny of <@${owner.id}>! <@${owner.id}> has been accused of abuse ${odata.abuse} time${odata.abuse > 1 ? "s" : "" }`, "color": client.colorInt("#ff0000")}});
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