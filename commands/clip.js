// Display a random anime clip
const mongoose = require("mongoose");
const Clip = require("../models/clip.js");

exports.run = async (client, message, args, level) => {
  if (!args[0]) args[0] = "en";
  await Clip.countDocuments().exec((err, count) => {
    var rnd = client.randInt(0, count-1);
    Clip.findOne().skip(rnd).exec((err, result) => {
      message.channel.send({"embed":{
        "title": `${result.title} ${result.isSpoiler ? "(Spoiler)" : ""}`,
        "description": `_${result.source}_ S${client.pad(result.season, 2)} E${client.pad(result.episode, 2)} ${result.isSpoiler ? "(Spoiler)" : ""}`,
        "url": `https://streamable.com/${args[0].toLowerCase() == "jp" ? result.jpid || result.enid : result.enid}`,
        "image": {"url": `https://michelle.jacenboy.com/assets/thumbnails/${result.enid}.png`},
        "color": client.colorInt("#3e3c73")
      }});
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "clip",
  category: "Entertainment",
  description: "Link to a random anime clip",
  usage: "clip"
};