// Search Kitsu for a user
const kitsu = require("node-kitsu");

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send("Please specify a username.");
  else var aniname = args.join(" ");
  try {
    var results = await kitsu.getUser(aniname, 0);
  } catch (ex) {
    if (ex.message.indexOf("ERR_UNESCAPED_CHARACTERS") != -1) {
      message.channel.send("This command only accepts English and Romaji titles. Please translate the title and try again.");
    } else {
      message.channel.send("An error occurred running this command. Please try again later.");
    }
    return client.logger.error(`${ex}`);
  }
  if (!results) {
    message.channel.send("No results found");
    client.logger.warn(`No Kitsu user found with the username ${aniname}`);
    return;
  }
  var aniresult = results[0].attributes;
  message.channel.send({"embed": {
    "title": aniresult.name,
    "description": aniresult.about || "No bio provided.",
    "color": client.colorInt("#fd8320"),
    "url": `https://kitsu.io/users/${aniresult.slug}`,
    "thumbnail": { "url": aniresult.avatar.large },
    "fields": [
      { "name": "Followers:", "value": aniresult.followersCount || 0, "inline": true },
      { "name": "Following:", "value": aniresult.followingCount || 0, "inline": true },
      { "name": "Posts:", "value": aniresult.postsCount || 0, "inline": true },
      { "name": "Reactions:", "value": aniresult.mediaReactionsCount || 0, "inline": true }
    ]
  }});
  client.logger.log(`User ${aniresult.name} found on Kitsu`);
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "user",
  category: "Kitsu",
  description: "Show information about a user on Kitsu.",
  usage: "user [username]"
};