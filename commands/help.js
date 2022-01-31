/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

exports.run = (interaction) => {
  const command = interaction.options.getString("command");
  // If no specific command is called, show all filtered commands.
  if (!command) {
    interaction.reply({content: "You can find a list of commands at https://michelle.jacenboy.com/commands", ephemeral: true});
  } else {
    // Show individual command's help.
    if (interaction.client.commands.has(command)) {
      const cmd = interaction.client.commands.get(command);
      const embed = {
        title: `/${cmd.help.name}`,
        description: `${cmd.help.description}\n**Usage:** ${cmd.help.usage}`,
        color: interaction.client.colorInt("#fca2cd")
      };
      interaction.reply({embeds: [embed], ephemeral: true});
    }
  }
};

exports.conf = {
  enabled: true,
  global: true,
  special: false,
  permLevel: "User",
  options: [
    {
      name: "command",
      description: "The name of a command",
      type: "STRING"
    }
  ]
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
