// Get a random image from a booru
const booru = require("booru");

exports.run = async (interaction) => {
  await interaction.deferReply();
  var site = (! ["DM","GROUP_DM"].includes(interaction.channel.type) ? (interaction.channel.nsfw ? "gb" : "sb") : "sb");
  var taglist = interaction.options.getString("tags") || "";
  if (taglist.indexOf("_") != -1) {
    var tagarray = taglist.split(/\s+/g);
  } else {
    var tagarray = taglist.split(/(?:,(?:\s+)?)/g);
    for (var i=0;i<tagarray.length;i++) {
      tagarray[i] = tagarray[i].replace(/\s+/g, "_");
    }
  }
  //if (site == "sb") { tagarray.push("-bikini", "-underwear"); }
  if (site == "gb") tagarray.push("-webm", "-mp4");
  var img = await booru.search(site, tagarray, {limit: 1, random: true});
  if (!img[0]) {
    interaction.editReply("No results found.");
    interaction.client.logger.warn(`No results found for tags: ${tagarray.join(", ")}`);
    return;
  }

  const embed = {
    "title": `${site == "gb" ? "Gelbooru" : "Safebooru"} #${img[0].id}`,
    "url": `https://${site == "sb" ? "safebooru.org" : "gelbooru.com"}/index.php?page=post&s=view&id=${img[0].id}`,
    "color": interaction.client.colorInt(site == "sb" ? "#84a8b9" : "#006ffa"),
    "image": {"url": img[0].fileUrl},
    "footer": {"text":`Score: ${img[0].score || 0}`}
  };
  interaction.editReply({"embeds": [embed]});
  interaction.client.logger.log(`${site == "gb" ? "Gelbooru" : "Safebooru"} #${img[0].id} found for tags: ${tagarray.join(", ")}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  permLevel: "User",
  options: [
    {
      name: "tags",
      description: "A list of Booru tags to search for",
      type: "STRING",
      required: true
    }
  ]
};

exports.help = {
  name: "booru",
  category: "Fanart",
  description: "Pull up a random image from Safebooru, or Gelbooru in NSFW chats",
  usage: "booru [tag 1, tag 2,...]"
};