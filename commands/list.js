// Add/view anime lists
const mongoose = require("mongoose");
const List = require("../models/list.js");

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send(`Improper format. Use \`${client.getSettings(message.guild.id).prefix}help list\` for assistance.`);
  if (message.mentions.users.first()) {
    var mode = "view";
    var usermention = message.mentions.users.first();
  }
  else {
    var mode = "add";
  }

  if (mode == "view") {
    // View mode - Return the mentioned user's lists, if available
    List.findById(usermention.id).exec((err, result) => {
      if (!result) return message.channel.send(`No profile found for ${usermention.username}`);
      var fieldarray = [];
      var i = 0;
      if (result.kitsu) {
        fieldarray[i] = {"name": "Kitsu", "value": `[${result.kitsu}](https://kitsu.io/users/${result.kitsu})`};
        i++;
      }
      if (result.mal) {
        fieldarray[i] = {"name": "MyAnimeList", "value": `[${result.mal}](https://myanimelist.net/profile/${result.mal})`};
        i++;
      }
      if (result.anilist) {
        fieldarray[i] = {"name": "AniList", "value": `[${result.anilist}](https://anilist.co/user/${result.kitsu})`};
        i++;
      }
      message.channel.send({"embed": {
        "title": `${usermention.username}'s Anime Lists`,
        "thumbnail": { "url": usermention.avatarURL || usermention.defaultAvatarURL },
        "fields": fieldarray
      }});
    });
  } else {
    // Add mode - Add a list to the user's profile
    switch (args[0].toLowerCase()) {
      case "kitsu":
      case "hummingbird":
        await List.updateOne({"_id": message.author.id}, {"kitsu": `${args[1].toLowerCase() == "clear" ? "" : args[1]}`}, {upsert: true});
        break;
      case "mal":
      case "myanimelist":
        await List.updateOne({"_id": message.author.id}, {"mal": `${args[1].toLowerCase() == "clear" ? "" : args[1]}`}, {upsert: true});
        break;
      case "anilist":
        await List.updateOne({"_id": message.author.id}, {"anilist": `${args[1].toLowerCase() == "clear" ? "" : args[1]}`}, {upsert: true});
        break;
      default:
        return message.channel.send(`Improper format. Use \`${client.getSettings(message.guild.id).prefix}help list\` for assistance.`);
    }
    message.channel.send("Anime list has been updated.");
  }
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  special: false,
  aliases: ["animelist","anilist"],
  permLevel: "User"
};
  
exports.help = {
  name: "list",
  category: "Anime",
  description: "View a user's anime list or add a list to your profile.",
  usage: "list [user tag]; list [Kitsu/MAL/AniList] [username]"
};