module.exports = async (interaction) => {
  // Ignore if the interaction isn't a command
  if (!interaction.isCommand()) return;

  // Check the commands collection for the command
  const cmd = interaction.client.slashCommands.get(interaction.commandName);
  // Ignore if the command doesn't exist
  if (!cmd) return;

  // Try to run the command
  try {
    await cmd.run(interaction);
  } catch (ex) {
    interaction.client.logger.error(ex);
  }
};