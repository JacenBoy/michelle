// Command Description
const {ApplicationCommandOptionType} = require("discord.js");
const Special = require("../models/special.js");

exports.run = async (interaction) => {
  const target = interaction.options.getUser("user") || await interaction.client.users.fetch(interaction.guild.ownerId);

  if (target.id == interaction.user.id) return;

  const profile = await Special.findById(target.id) || {"gratitude": 0};
  const res = await Special.findByIdAndUpdate(target.id, {"gratitude": profile.gratitude ? profile.gratitude + 1 : 1}, {upsert: true, new: true});

  const embed = {
    "title": `Thank you, ${target.username}, for everything you do!`,
    "description": `${target.username} thank count: ${res.gratitude}`,
    "color": interaction.client.colorInt("#00ff00")
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
      type: ApplicationCommandOptionType.User,
      required: true
    }
  ]
};

exports.help = {
  name: "gratitude",
  category: "Entertainment",
  description: "Show your appreciation for a server owner",
  usage: "gratitude"
};