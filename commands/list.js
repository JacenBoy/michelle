/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Add/view anime lists

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send(`Improper format. Use \`${client.getSettings(message.guild.id).prefix}help list\` for assistance.`);
  if (message.mentions.members.first()) {
    // View mode - Return the mentioned user's lists, if available
    var usermention = message.mentions.members.first();
    if (!client.profiles.has(usermention.id)) return message.channel.send(`No profile found for ${usermention.username}`);
    var curprofile = client.profiles.get(usermention.id);
    if (!curprofile.lists) return message.channel.send(`No profile found for ${usermention.username}`);
    var fieldarray = [];
    if (curprofile.lists.kitsu) {
      fieldarray[0] = {"name": "Kitsu", "value": curprofile.lists.kitsu};
    }
    if (curprofile.lists.mal) {
      fieldarray[0] = {"name": "MAL", "value": curprofile.lists.mal};
    }
    if (curprofile.lists.anilist) {
      fieldarray[0] = {"name": "AniList", "value": curprofile.lists.anilist};
    }
  } else {
    // Add mode - Add a list to the user's profile
    client.profiles.ensure(message.author.id, {
      "user": message.author.id
    });
    switch (args[0].toLowerCase()) {
      case 'kitsu':
        client.profiles.set(message.author.id, args[1], "lists.kitsu");
        break;
      case 'mal':
        client.profiles.set(message.author.id, args[1], "lists.mal");
        break;
      case 'anilist':
        client.profiles.set(message.author.id, args[1], "lists.anilist");
        break;
      default:
        return message.channel.send(`Improper format. Use \`${client.getSettings(message.guild.id).prefix}help list\` for assistance.`);
    }
  }
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['animelist','anilist'],
  permLevel: "User"
};
  
exports.help = {
  name: "list",
  category: "Anime",
  description: "View a user's anime list or add a list to your profile.",
  usage: "list [user tag]; list [Kitsu/MAL/AniList] [username]"
};