// Pulls a random quote from a JSON file and displays it.
const mongoose = require("mongoose");
const Quote = require("../models/quote.js");

exports.run = async (interaction) => {
  await Quote.countDocuments().exec((err, count) => {
    var rnd = interaction.client.randInt(0, count-1);
    Quote.findOne().skip(rnd).exec((err, result) => {
      const embed = {
        "description": `"${result.quote}"`,
        "fields": [{
          "name": "-",
          "value": `${result.attribution} ${result.source ? `, *${result.source}*` : ""}`
        }]
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
  name: "quote",
  category: "Entertainment",
  description: "Displays a random quote.",
  usage: "quote"
};