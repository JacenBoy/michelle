exports.run = async (interaction) => {
  interaction.reply({"content": "Deploying commands", "ephemeral": true});
  const commands = interaction.options.getString("commands").split(" ");
  const guildId = interaction.options.getString("guild") ? interaction.options.getString("guild") : undefined;
  commands.forEach(async (cmd) => {
    const command = interaction.client.commands.get(cmd);
    await interaction.client.deploy(cmd, guildId);
    await interaction.followUp({"content": `The command \`${command.help.name}\` has been deployed`, "ephemeral": true});
  });
};

exports.conf = {
  enabled: true,
  global: false,
  special: false,
  aliases: [],
  permLevel: "Admin",
  options: [
    {
      name: "commands",
      description: "The commands to reload",
      type: "STRING",
      required: true
    },
    {
      name: "guild",
      description: "The guild to deploy the commands to",
      type: "STRING"
    }
  ]
};

exports.help = {
  name: "deploy",
  category: "System",
  description: "Deploys new commands.",
  usage: "deploy [command]"
};
