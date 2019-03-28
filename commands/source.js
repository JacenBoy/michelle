/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Find the source of an image

exports.run = async (client, message, args, level) => {
  args[1] = args[1] == "list" ? 5 : 1;
  const checkImage = require("is-image-url");
  const Sagiri = require("sagiri");
  const saucenao = new Sagiri(client.config.saucetoken, {"getRating": true, "numRes": args[1]});

  if (!checkImage(args[0])) {
    message.channel.send("The URL you specified is not an image. Please check your URL.");
    client.logger.warn("Invalid URL specified.");
    return;
  }

  var results = await saucenao.getSauce(args[0]);
  client.logger.debug(JSON.stringify(results));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sauce"],
  permLevel: "User"
};

exports.help = {
  name: "source",
  category: "Fanart",
  description: "Get the cource of an image from its URL",
  usage: "sauce [image url] <list>"
};