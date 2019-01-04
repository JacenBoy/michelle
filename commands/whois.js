/*
whois - Show a usercard about a specified user. If no user is specified,
show a usercard about the user who called the command.
*/

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  // If no specific user is mentioned, show information about the current user.
  if (!args[0]) {
    var userget = message.author;
  } else {
    var userget;
  }
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: "whois",
  category: "System",
  description: "Gets additional information about a user.",
  usage: "whois [mention]"
};