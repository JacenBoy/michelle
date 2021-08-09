// Find the source of an image
const checkImage = require("is-image-url");
const Sagiri = require("sagiri");

exports.run = async (client, message, args, level) => {
  args[1] = args[1] == "list" ? 5 : 1;
  const saucenao = Sagiri(client.config.saucetoken, {"results": args[1]});
  const img = message.attachments.first() ? message.attachments.first().proxyURL : args[0];

  if (!checkImage(img)) {
    message.channel.send("The URL you specified is not an image. Please check your URL.");
    client.logger.warn("Invalid URL specified.");
    return;
  }

  var results = await saucenao(img);

  const embed = {"embed": {
    "title": results[0].raw.data.title || `Image from ${results[0].site}`,
    "url": results[0].url,
    "color": client.colorInt("#1d1d1d"),
    "image": { "url": results[0].thumbnail },
    "fields": [
      { "name": "Similarity", "value": `${results[0].similarity}` },
      { "name": results[0].raw.data.anidb_aid ? "Anime" : "Artist", "value": `${results[0].raw.data.anidb_aid ? results[0].raw.data.source : results[0].raw.data.creator || `${results[0].raw.data.member_name} (${results[0].raw.data.member_id})`}` }
    ]
  }};
  message.channel.send({"embeds": [embed]});
  client.logger.log(`Result from ${results[0].site} found for ${img}`);
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