// Link to funding

exports.run = async (client, message, args, level) => {
  message.channel.send({"embed":{
    "title": "Support Michelle",
    "description": "If you would like to help support Michelle's operation and development, you can send a small donation on [Ko-fi](https://ko-fi.com/jacenboy). Michelle is just a personal project, and is not intended to make money, but your support is still appreciated.",
    "color": client.colorInt("#fca2cd")
  }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: ["kofi","funding"],
  permLevel: "User"
};

exports.help = {
  name: "fund",
  category: "System",
  description: "Get information on how to support Michelle's development",
  usage: "fund"
};