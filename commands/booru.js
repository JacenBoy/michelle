// Get a random image from a booru
const {ApplicationCommandOptionType, ChannelType} = require("discord.js");
const booru = require("booru");

exports.run = async (interaction) => {
  await interaction.deferReply();
  const site = (interaction.channel.type == ChannelType.DM || interaction.channel.type == ChannelType.GroupDM  ? "sb" : (interaction.channel.nsfw ? "gb" : "sb"));
  const taglist = interaction.options.getString("tags") || "";
  let tagarray;
  if (taglist.indexOf("_") != -1) {
    tagarray = taglist.split(/\s+/g);
  } else {
    tagarray = taglist.split(/(?:,(?:\s+)?)/g);
    for (let i=0;i<tagarray.length;i++) {
      tagarray[i] = tagarray[i].replace(/\s+/g, "_");
    }
  }
  //if (site == "sb") { tagarray.push("-bikini", "-underwear"); }
  if (site == "gb") tagarray.push("-webm", "-mp4");
  const img = await booru.search(site, tagarray, {limit: 1, random: true});
  if (!img[0]) {
    const embed = {
      "title": "No results found",
      "fields": [{"name": "Tags", "value": tagarray.join(", ")}],
      "color": interaction.client.colorInt(site == "sb" ? "#84a8b9" : "#006ffa")
    };
    interaction.editReply({"embeds": [embed]});
    interaction.client.logger.warn(`No results found for tags: ${tagarray.join(", ")}`);
    return;
  }

  const embed = {
    "title": `${site == "gb" ? "Gelbooru" : "Safebooru"} #${img[0].id}`,
    "url": `https://${site == "sb" ? "safebooru.org" : "gelbooru.com"}/index.php?page=post&s=view&id=${img[0].id}`,
    "color": interaction.client.colorInt(site == "sb" ? "#84a8b9" : "#006ffa"),
    "fields": [{"name": "Tags", "value": tagarray.join(", ")}],
    "image": {"url": img[0].fileUrl},
    "footer": {"text":`Score: ${img[0].score || 0}`}
  };
  interaction.editReply({"embeds": [embed]});
  interaction.client.logger.log(`${site == "sb" ? "Safebooru" : "Gelbooru"} #${img[0].id} found for tags: ${tagarray.join(", ")}`);
};

exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "User",
  options: [
    {
      name: "tags",
      description: "A list of Booru tags to search for",
      type: ApplicationCommandOptionType.String,
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