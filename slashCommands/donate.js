// Link to funding

exports.run = async (interaction) => {
  const embed = {
    "title": "Support Michelle",
    "description": "If you would like to help support Michelle's operation and development, you can send a small donation on [Ko-fi](https://ko-fi.com/jacenboy). Michelle is just a personal project, and is not intended to make money, but your support is still appreciated.",
    "color": interaction.client.colorInt("#fca2cd")
  };
  interaction.reply({"embeds": [embed]});
};

exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "User",
  options: []
};

exports.help = {
  name: "donate",
  category: "System",
  description: "Get information on how to support Michelle's development",
  usage: "fund"
};