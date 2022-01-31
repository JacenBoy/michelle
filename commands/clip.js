// Display a random anime clip
const mongoose = require("mongoose");
const Clip = require("../models/clip.js");

exports.run = async (interaction) => {
  await Clip.countDocuments().exec((err, count) => {
    var rnd = interaction.client.randInt(0, count-1);
    Clip.findOne().skip(rnd).exec((err, result) => {
      const embed = {
        "title": `${result.title} ${result.isSpoiler ? "(Spoiler)" : ""}`,
        "description": `_${result.source}_ S${interaction.client.pad(result.season, 2)} E${interaction.client.pad(result.episode, 2)} ${result.isSpoiler ? "(Spoiler)" : ""}`,
        "url": `https://streamable.com/${result.enid}`,
        "image": {"url": `https://michelle.jacenboy.com/assets/thumbnails/${result.enid}.png`},
        "color": interaction.client.colorInt("#3e3c73")
      };
      interaction.reply({"embeds": [embed]});
    });
  });
};

exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "User",
  options: []
};

exports.help = {
  name: "clip",
  category: "Entertainment",
  description: "Link to a random anime clip",
  usage: "clip"
};