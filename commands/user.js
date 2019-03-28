/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Search Kitsu for a user

exports.run = async (client, message, args, level) => {
  const kitsu = require("node-kitsu");
  if (!args[0]) {
    var aniname = await client.awaitReply(message, "What is the name of the user you want to search for?", 15000);
    if (!aniname) return client.logger.warn(`${message.author.username}'s request timed out.`);
  }
  else var aniname = args.join(" ");
  var embed;
  try {
    var results = await kitsu.getUser(aniname, 0);
  } catch (ex) {
    message.channel.send("An error occured running this command. This is likely due to an issue on Kitsu's end, and not an error with the bot. Please try your command again later.");
    return client.logger.err(`An error occurred with the command: ${ex}`);
  }
  if (!results[0]) {
    message.channel.send("No results found");
    client.logger.warn(`No Kitsu user found with the username ${aniname}`);
    return;
  }
  var aniresult = results[0].attributes;
  embed = { "embed": {
      "title": aniresult.name,
      "description": aniresult.about || "No bio provided.",
      "url": `https://kitsu.io/users/${aniresult.slug}`,
      "thumbnail": { "url": aniresult.avatar.large },
      "fields": [
          { "name": "Followers:", "value": aniresult.followersCount || 0, "inline": true },
          { "name": "Following:", "value": aniresult.followingCount || 0, "inline": true },
          { "name": "Posts:", "value": aniresult.postsCount || 0, "inline": true },
          { "name": "Reactions:", "value": aniresult.mediaReactionsCount || 0, "inline": true }
      ]
  } };
  message.channel.send(embed);
  client.logger.log(`User ${aniresult.name} found on Kitsu`);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "user",
    category: "Kitsu",
    description: "Show information about a user on Kitsu.",
    usage: "user [username]"
  };