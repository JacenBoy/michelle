/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Add/view anime lists

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send(`Improper format. Use \`${client.getSettings(message.guild.id).prefix}help list\` for assistance.`);
  if (message.mentions.users.first()) {
    // View mode - Return the mentioned user's lists, if available
    var usermention = message.mentions.users.first();
    if (!client.profiles.has(usermention.id)) return message.channel.send(`No profile found for ${usermention.username}`);
    var curprofile = client.profiles.get(usermention.id);
    if (!curprofile.lists) return message.channel.send(`No profile found for ${usermention.username}`);
    var fieldarray = [];
    var i = 0;
    if (curprofile.lists.kitsu) {
      fieldarray[i] = {"name": "Kitsu", "value": `[${curprofile.lists.kitsu}](https://kitsu.io/users/${curprofile.lists.kitsu})`};
      i++;
    }
    if (curprofile.lists.mal) {
      fieldarray[i] = {"name": "MyAnimeList", "value": `[${curprofile.lists.mal}](https://myanimelist.net/profile/${curprofile.lists.mal})`};
      i++;
    }
    if (curprofile.lists.anilist) {
      fieldarray[i] = {"name": "AniList", "value": `[${curprofile.lists.anilist}](https://anilist.co/user/${curprofile.lists.anilist})`};
      i++;
    }
    var embed = { "embed": {
      "title": `${usermention.username}'s Anime Lists`,
      "thumbnail": { "url": usermention.avatarURL || usermention.defaultAvatarURL },
      "fields": fieldarray
    } };
    message.channel.send(embed);
  } else {
    // Add mode - Add a list to the user's profile
    client.profiles.ensure(message.author.id, {
      "user": message.author.id
    });
    switch (args[0].toLowerCase()) {
      case 'kitsu':
        client.profiles.set(message.author.id, args[1] || false, "lists.kitsu");
        break;
      case 'mal':
        client.profiles.set(message.author.id, args[1] || false, "lists.mal");
        break;
      case 'anilist':
        client.profiles.set(message.author.id, args[1] || false, "lists.anilist");
        break;
      default:
        return message.channel.send(`Improper format. Use \`${client.getSettings(message.guild.id).prefix}help list\` for assistance.`);
    }
    message.channel.send('Anime list has been updated.');
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