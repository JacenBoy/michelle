// Search Kitsu for a user
const kitsu = require("node-kitsu");

exports.run = async (interaction) => {
  const uname = interaction.options.getString("user");
  if (!uname) return interaction.reply("Please specify a username");
  await interaction.deferReply();
  try {
    var results = await kitsu.getUser(uname, 0);
  } catch (ex) {
    if (ex.message.indexOf("ERR_UNESCAPED_CHARACTERS") != -1) {
      interaction.editReply("This command only accepts English and Romaji usernames. Please translate the title and try again.");
    } else {
      interaction.editReply("An error occurred running this command. Please try again later.");
    }
    return interaction.client.logger.error(`${ex}`);
  }
  if (!results || !results[0]) {
    interaction.editReply("No results found");
    interaction.client.logger.warn(`No Kitsu user found with the username ${uname}`);
    return;
  }
  var aniresult = results[0].attributes;

  const embed = {
    "title": aniresult.name,
    "description": aniresult.about || "No bio provided.",
    "color": interaction.client.colorInt("#fd8320"),
    "url": `https://kitsu.io/users/${aniresult.slug}`,
    "thumbnail": { "url": aniresult.avatar.large },
    "fields": [
      { "name": "Followers:", "value": `${aniresult.followersCount || 0}`, "inline": true },
      { "name": "Following:", "value": `${aniresult.followingCount || 0}`, "inline": true },
      { "name": "Posts:", "value": `${aniresult.postsCount || 0}`, "inline": true },
      { "name": "Reactions:", "value": `${aniresult.mediaReactionsCount || 0}`, "inline": true }
    ]
  };
  interaction.editReply({"embeds": [embed]});
  interaction.client.logger.log(`User ${aniresult.name} found on Kitsu`);
};
  
exports.conf = {
  enabled: true,
  global: false,
  special: false,
  permLevel: "User",
  options: [
    {
      name: "user",
      description: "The Kitsu username of the user to search for",
      type: "STRING",
      required: true
    }
  ]
};

exports.help = {
  name: "user",
  category: "Kitsu",
  description: "Show information about a user on Kitsu.",
  usage: "user [username]"
};