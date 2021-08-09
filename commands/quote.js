// Pulls a random quote from a JSON file and displays it.
const mongoose = require("mongoose");
const Quote = require("../models/quote.js");

exports.run = async (client, message, args, level) => {
  await Quote.countDocuments().exec((err, count) => {
    var rnd = client.randInt(0, count-1);
    Quote.findOne().skip(rnd).exec((err, result) => {
      const embed = {
        "description": `"${result.quote}"`,
        "fields": [{
          "name": "-",
          "value": `${result.attribution} ${result.source ? `, *${result.source}*` : ""}`
        }]
      };
      message.channel.send({"embeds": [embed]});
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
  name: "quote",
  category: "Entertainment",
  description: "Displays a random quote.",
  usage: "quote"
};