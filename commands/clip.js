// Display a random anime clip

exports.run = async (client, message, args, level) => {
  var randclip = client.clips.random();
  
  const embed = {"embed":{
    "title": `${randclip.title} ${randclip.isSpoiler ? "(Spoiler)" : ""}`,
    "description": `${randclip.source} S${client.pad(randclip.season, 2)}E${client.pad(randclip.episode, 2)} ${randclip.isSpoiler ? "(Spoiler)" : ""}`,
    "url": `https://streamable.com/${args[0].toLowerCase() == "jp" ? randclip.jpid || randclip.id : randclip.id}`,
    "image": {"url": `https://michelle.jacenboy.com/assets/thumbnails/${randclip.id}.png`}
  }};
  message.channel.send(embed);
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