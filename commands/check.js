const {ApplicationCommandOptionType} = require("discord.js");
const Special = require("../models/special.js");
const { DateTime } = require("luxon");

exports.run = async (interaction) => {
  const mode = interaction.options.getString("mode");
  let target = interaction.options.getUser("user");
  if (!mode) return;
  let embed;
  switch (mode) {
    case "horny": {
      if (!target) target = interaction.username;
      const profile = await Special.findById(target.id);
      if (!profile) {
        embed = {
          "title": `${target.username} horny count: 0`, 
          "description": `There have been no recorded instances of ${target.username} being horny`,
          "color": interaction.client.colorInt("#ff0000")
        };
      }
      else if (!profile.horny) {
        embed = {
          "title": `${target.username} horny count: 0`, 
          "description": `There have been no recorded instances of ${target.username} being horny`,
          "color": interaction.client.colorInt("#ff0000")
        };
      } else {
        const diff = DateTime.now().diff(DateTime.fromISO(profile.horny.lastTime), ["days", "hours", "minutes", "seconds", "milliseconds"]);
        embed = {
          "title": `${target.username} horny count: ${profile.horny.totalCount}`, 
          "description": `It has been ${diff.days ? diff.days + " days " : ""}${diff.hours ? diff.hours + " hours " : ""}${diff.minutes ? diff.minutes + " minutes " : ""}${diff.seconds ? diff.seconds + " seconds " : ""}since ${target.username} was last horny`,
          "color": interaction.client.colorInt("#ff0000")
        };
      }

      interaction.reply({"embeds": [embed]});
      break;
    }
    case "abuse": {
      if (!target) target = await interaction.client.users.fetch(interaction.guild.ownerId);

      const profile = await Special.findById(target.id);
      if (!profile) {
        embed = {
          "description": `<@${target.id}> has never been accused of abuse`,
          "color": interaction.client.colorInt("#ff0000")
        };
      } else {
        if (!profile.abuse) {
          embed = {
            "description": `<@${target.id}> has never been accused of abuse`,
            "color": interaction.client.colorInt("#ff0000")
          };
        }
        else {
          embed = {
            "description": `<@${target.id}> has been accused of abuse ${profile.abuse} time${profile.abuse > 1 ? "s" : "" }`,
            "color": interaction.client.colorInt("#ff0000")
          };
        }
      }

      interaction.reply({"embeds": [embed]});
      break;
    }
    case "gratitude": {
      if (!target) target = await interaction.client.users.fetch(interaction.guild.ownerId);

      const profile = await Special.findById(target.id);
      if (!profile) {
        embed = {
          "description": `<@${target.id}> has never been thanked`,
          "color": interaction.client.colorInt("#00ff00")
        };
      } else {
        if (!profile.gratitude) {
          embed = {
            "description": `<@${target.id}> has never been thanked`,
            "color": interaction.client.colorInt("#00ff00")
          };
        }
        else {
          embed = {
            "description": `<@${target.id}> has been thanked ${profile.gratitude} time${profile.gratitude > 1 ? "s" : "" }`,
            "color": interaction.client.colorInt("#00ff00")
          };
        }
      }

      interaction.reply({"embeds": [embed]});
      break;
    }
    default:
      return interaction.reply("Improper usage. Use `/help check` for assistance.");
  }
};

exports.conf = {
  enabled: true,
  global: false,
  special: ["411027224389615617", "140308655856680960"],
  permLevel: "User",
  options: [
    {
      name: "mode",
      description: "The information to check (abuse/gratitude/horny)",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Horny",
          value: "horny"
        },
        {
          name: "Abuse",
          value: "abuse"
        },
        {
          name: "Gratitude",
          value: "gratitude"
        }
      ]
    },
    {
      name: "user",
      description: "The user to target",
      type: ApplicationCommandOptionType.User
    }
  ]
};
  
exports.help = {
  name: "check",
  category: "Entertainment",
  description: "Check data for m-horny, m-abuse, and m-gratitude",
  usage: "check [horny/abuse/gratitude] [user tag]"
};