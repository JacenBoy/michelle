/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Get a random image from a booru

exports.run = async (client, message, args, level) => {
  var site = (! ["dm","group"].includes(message.channel.type) ? (message.channel.nsfw ? "gb" : "sb") : "sb");
  var taglist = "";
  for (var i=0;i<args.length;i++) {
    taglist += args[i];
    if (i != args.length - 1) taglist += " ";
  }
  var tagarray = taglist.split(", ");
  for (var i=0;i<tagarray.length;i++) {
    tagarray[i] = tagarray[i].replace(/\ /g, "_");
  }
  client.booru.search(site, tagarray, {limit: 1, random: true}).then(img => {
    if (!img[0]) {
      message.channel.send("No results found.");
      client.logger.warn(`No results found for tags: ${tagarray.join(", ")}`);
      return;
    }
    if (img[0].tags.includes("webm")) return message.channel.send({"embed": { "description": "The randomly selected image is a webm video, which cannot be displayed. This is a [known issue](https://github.com/JacenBoy/michelle/issues/33). Please do not report this error."}});
    const embed = {"embed": {
      "title": `${site == "gb" ? "Gelbooru" : "Safebooru"} #${img[0].id}`,
      "url": `https://${site == "sb" ? "safebooru.org" : "gelbooru.com"}/index.php?page=post&s=view&id=${img[0].id}`,
      "image": {"url": img[0].file_url},
      "footer": {"text":`Score: ${img[0].score}`},
      "timestamp": img[0].createdAt.toString()
    }};
    client.logger.log(`${site == "gb" ? "Gelbooru" : "Safebooru"} #${img[0].id} found for tags: ${tagarray.join(", ")}`);
    message.channel.send(embed);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "booru",
  category: "Anime",
  description: "Pull up a random image from Safebooru, or Gelbooru in NSFW chats",
  usage: "booru [tag 1, tag 2,...]"
};