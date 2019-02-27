/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Add/view anime lists

exports.run = async (client, message, args, level) => {
  if (!args[0]) {
    var resp = await client.awaitReply(message, "Would you like to `view` someone's anime lists or `add` your own list?", 15000);
    if (!resp) return client.logger.warn(`${message.author.username}'s request timed out.`);
    switch (resp.toLowerCase()) {
      case "view":
        var mode = "view";
        var ulist = await client.awaitReply(message, "Please tag the user whose list you want to see.", 15000);
        if (!ulist) return client.logger.warn(`${message.author.username}'s request timed out.`);
        ulist = ulist.replace(/<|>|@|!/gi, "");
        client.logger.debug(ulist);
        try {
          var usermention = await client.fetchUser(ulist);
          if (!usermention) return client.logger.warn(`${message.author.username}'s request was cancelled.`);
        } catch (ex) {
          return client.logger.warn(`${message.author.username}'s request was cancelled.`);
        }
        break;
      case "add":
        var mode = "add";
        args[0] = await client.awaitReply(message, "Which site would you like to add? [MAL/Kitsu/AniList]", 15000);
        if (!args[0]) return client.logger.warn(`${message.author.username}'s request timed out.`);
        break;
      default:
        return client.logger.warn(`${message.author.username}'s request was cancelled.`);
    }
  } else {
    if (message.mentions.users.first()) {
      var mode = "view";
      var usermention = message.mentions.users.first();
    }
    else {
      var mode = "add";
    }
  }

  if (mode == "view") {
    // View mode - Return the mentioned user's lists, if available
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
      case "kitsu":
        if (!args[1]) args[1] = await client.awaitReply(message, "Please enter your Kitsu username, or `clear` to remove it from your profile.", 15000);
        if (!args[1]) return client.logger.warn(`${message.author.username}'s request timed out.`);
        if (args[1].toLowerCase() == "clear") args[1] = false;
        client.profiles.set(message.author.id, args[1] || false, "lists.kitsu");
        break;
      case "mal":
        if (!args[1]) args[1] = await client.awaitReply(message, "Please enter your MyAnimeList username, or `clear` to remove it from your profile.", 15000);
        if (!args[1]) return client.logger.warn(`${message.author.username}'s request timed out.`);
        if (args[1].toLowerCase() == "clear") args[1] = false;
        client.profiles.set(message.author.id, args[1] || false, "lists.mal");
        break;
      case "anilist":
        if (!args[1]) args[1] = await client.awaitReply(message, "Please enter your AniList username, or `clear` to remove it from your profile.", 15000);
        if (!args[1]) return client.logger.warn(`${message.author.username}'s request timed out.`);
        if (args[1].toLowerCase() == "clear") args[1] = false;
        client.profiles.set(message.author.id, args[1] || false, "lists.anilist");
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
  aliases: ["animelist","anilist"],
  permLevel: "User"
};
  
exports.help = {
  name: "list",
  category: "Anime",
  description: "View a user's anime list or add a list to your profile.",
  usage: "list [user tag]; list [Kitsu/MAL/AniList] [username]"
};