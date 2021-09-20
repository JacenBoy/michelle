module.exports = async (client, interaction) => {
  // Ignore if the interaction isn't a command
  if (!interaction.isCommand()) return;

  // Check the commands collection for the command
  const cmd = interaction.client.slashCommands.get(interaction.commandName);
  // Ignore if the command doesn't exist
  if (!cmd) return;

  // If the member on a guild is invisible or not cached, fetch them
  if (interaction.guild && !interaction.member) await interaction.guild.members.fetch(interaction.user);
  // Check to make sure the user has the permissions to run the command
  if (!client.checkPermissions(cmd.conf.permLevel, interaction.user.id)) {
    return interaction.reply({content: "You do not have sufficient permissions to run this command", ephemeral: true});
  }

  // Try to run the command
  try {
    client.logger.cmd(`[CMD] ${interaction.user.username} (${interaction.user.id}) ran command ${cmd.help.name}`);
    await cmd.run(interaction);
  } catch (ex) {
    interaction.reply({content: "An error occurred running this command", ephemeral: true});
    client.logger.error(ex);
  }
};