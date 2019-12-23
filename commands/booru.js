// Get a random image from a booru

exports.run = async (client, message, args, level) => {
  const booru = require("booru");
  var site = (! ["dm","group"].includes(message.channel.type) ? (message.channel.nsfw ? "gb" : "sb") : "sb");
  var taglist = args.join(" ");
  var tagarray = taglist.split(", ");
  for (var i=0;i<tagarray.length;i++) {
    tagarray[i] = tagarray[i].replace(/\s/g, "_");
  }
  //if (site == "sb") { tagarray.push("-bikini", "-underwear"); }
  if (site == "gb") tagarray.push("-webm", "-mp4");
  var img = await booru.search(site, tagarray, {limit: 1, random: true});
  if (!img[0]) {
    message.channel.send("No results found.");
    client.logger.warn(`No results found for tags: ${tagarray.join(", ")}`);
    return;
  }
  message.channel.send({"embed": {
    "title": `${site == "gb" ? "Gelbooru" : "Safebooru"} #${img[0].id}`,
    "url": `https://${site == "sb" ? "safebooru.org" : "gelbooru.com"}/index.php?page=post&s=view&id=${img[0].id}`,
    "color": client.colorInt(site == "sb" ? "#84a8b9" : "#006ffa"),
    "image": {"url": img[0].file_url},
    "footer": {"text":`Score: ${img[0].score}`}
  }});
  client.logger.log(`${site == "gb" ? "Gelbooru" : "Safebooru"} #${img[0].id} found for tags: ${tagarray.join(", ")}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "booru",
  category: "Fanart",
  description: "Pull up a random image from Safebooru, or Gelbooru in NSFW chats",
  usage: "booru [tag 1, tag 2,...]"
};