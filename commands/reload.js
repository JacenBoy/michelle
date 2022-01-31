exports.run = async (interaction) => {
  interaction.reply({"content": "Reloading commands", "ephemeral": true});
  const commands = interaction.options.getString("commands").split(" ");
  commands.forEach(async (cmd) => {
    const command = interaction.client.commands.get(cmd);
    let response = await interaction.client.unloadCommand(command.help.name);
    if (response) return interaction.followUp({"content": `Error Unloading: ${response}`, "ephemeral": true});

    response = interaction.client.loadCommand(command.help.name, true);
    if (response) return interaction.followUp({"content": `Error Loading: ${response}`, "ephemeral": true});

    await interaction.followUp({"content": `The command \`${command.help.name}\` has been reloaded`, "ephemeral": true});
  });
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
    }
  ]
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command that's been modified.",
  usage: "reload [command]"
};
