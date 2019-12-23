// Find the source of an image

exports.run = async (client, message, args, level) => {
  args[1] = args[1] == "list" ? 5 : 1;
  const checkImage = require("is-image-url");
  const Sagiri = require("sagiri");
  const saucenao = Sagiri(client.config.saucetoken, {"results": args[1]});

  if (!checkImage(args[0])) {
    message.channel.send("The URL you specified is not an image. Please check your URL.");
    client.logger.warn("Invalid URL specified.");
    return;
  }

  var results = await saucenao(args[0]);
  message.channel.send({"embed": {
    "title": results[0].raw.data.title || `Image from ${results[0].site}`,
    "url": results[0].url,
    "color": client.colorInt("#1d1d1d"),
    "image": { "url": results[0].thumbnail },
    "fields": [
      { "name": "Similarity", "value": `${results[0].similarity}` },
      { "name": "Artist", "value": `${results[0].raw.data.creator || `${results[0].raw.data.member_name} (${results[0].raw.data.member_id})`}` }
    ]
  }});
  client.logger.log(`Result from ${results[0].site} found for ${args[0]}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: ["sauce"],
  permLevel: "User"
};

exports.help = {
  name: "source",
  category: "Fanart",
  description: "Get the cource of an image from its URL",
  usage: "sauce [image url]"
};