exports.run = async (interaction) => {
  interaction.reply({"content": "Deploying commands", "ephemeral": true});
  const commands = interaction.options.getString("commands").split(" ");
  const guildId = interaction.options.getString("guild") ? interaction.options.getString("guild") : undefined;
  for (const cmd of commands) {
    await interaction.client.deploy(cmd, guildId);
    const command = interaction.client.commands.get(cmd);
    await interaction.followUp({"content": `The command \`${command.help.name}\` has been deployed`, "ephemeral": true});
  }
};

exports.conf = {
  enabled: true,
  global: true,
  special: false,
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
