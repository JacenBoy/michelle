/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Make the bot say something in chat.

exports.run = async (client, message, args, level) => {
  var saytext = args.join(" ");
  message.channel.send(saytext);
  try {
    message.delete();
  } catch (ex) {
    // ¯\_(ツ)_/¯
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "say",
  category: "System",
  description: "Make the bot say something arbitrary.",
  usage: "say [string]"
};