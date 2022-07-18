// Add/view anime lists
const {ApplicationCommandOptionType} = require("discord.js");
const mongoose = require("mongoose");
const List = require("../models/list.js");

exports.run = async (interaction) => {
  const mode = interaction.options.getSubcommand();
  if (!mode) return interaction.reply("Improper format. Use `/help list` for assistance.");
  if (mode == "view") {
    // View mode - Return the mentioned user's lists, if available
    const target = interaction.options.getUser("user");
    List.findById(target.id).exec((err, result) => {
      if (!result) return interaction.reply(`No profile found for ${target.username}`);
      const fieldarray = [];
      let i = 0;
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

      const embed = {
        "title": `${target.username}'s Anime Lists`,
        "thumbnail": { "url": target.avatarURL() || target.defaultAvatarURL() },
        "fields": fieldarray
      };
      interaction.reply({"embeds": [embed]});
    });
  } else {
    // Add mode - Add a list to the user's profile
    const site = interaction.options.getString("site");
    const uname = interaction.options.getString("username");
    switch (site) {
      case "kitsu":
        await List.updateOne({"_id": interaction.user.id}, {"kitsu": `${uname.toLowerCase() == "clear" ? "" : uname}`}, {upsert: true});
        break;
      case "mal":
        await List.updateOne({"_id": interaction.user.id}, {"mal": `${uname.toLowerCase() == "clear" ? "" : uname}`}, {upsert: true});
        break;
      case "anilist":
        await List.updateOne({"_id": interaction.user.id}, {"anilist": `${uname.toLowerCase() == "clear" ? "" : uname}`}, {upsert: true});
        break;
      default:
        return interaction.reply("Improper format. Use `/help list` for assistance.");
    }
    interaction.reply("Anime list has been updated.");
  }
};
  
exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "User",
  options: [
    {
      name: "view",
      description: "View the links to another user's anime lists",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The user whose links you want to retrieve",
          type: ApplicationCommandOptionType.User,
          required: true
        }
      ]
    },
    {
      name: "update",
      description: "Add or update links to your anime lists",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "site",
          description: "The site you want to add a link to",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "Kitsu.io",
              value: "kitsu"
            },
            {
              name: "MyAnimeList",
              value: "mal"
            },
            {
              name: "AniList",
              value: "anilist"
            }
          ]
        },
        {
          name: "username",
          description: "Your username on the site",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    }
  ]
};
  
exports.help = {
  name: "list",
  category: "Anime",
  description: "View a user's anime list or add a list to your profile.",
  usage: "list [user tag]; list [Kitsu/MAL/AniList] [username]"
};