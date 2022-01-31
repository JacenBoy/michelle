// Command Description
const Special = require("../models/special.js");

exports.run = async (interaction) => {
  const target = interaction.options.getUser("user") || await interaction.client.users.fetch(interaction.guild.ownerId);

  if (target.id == interaction.user.id) return;

  const profile = await Special.findById(target.id) || {"abuse": 0};
  const res = await Special.findByIdAndUpdate(target.id, {"abuse": profile.abuse ? profile.abuse + 1 : 1}, {upsert: true, new: true});

  const embed = {
    "title": `Rise up against the tyranny of ${target.username}!`,
    "description": `${target.username} abuse count: ${res.abuse}`,
    "color": interaction.client.colorInt("#ff0000")
  };
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
      type: "USER",
      required: true
    }
  ]
};

exports.help = {
  name: "abuse",
  category: "Entertainment",
  description: "Accuse a server owner of abusing their power",
  usage: "abuse"
};