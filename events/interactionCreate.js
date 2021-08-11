module.exports = async (client, interaction) => {
  // Ignore if the interaction isn't a command
  if (!interaction.isCommand()) return;

  // Check the commands collection for the command
  const cmd = interaction.client.slashCommands.get(interaction.commandName);
  // Ignore if the command doesn't exist
  if (!cmd) return;

  // Get the server settings
  const settings = client.config.defaultSettings;

  // If the member on a guild is invisible or not cached, fetch them.
  if (interaction.guild && !interaction.member) await interaction.guild.members.fetch(interaction.user);
  // Get the user or member's permission level from the elevation
  const level = client.permlevel(interaction);
  if (level < client.levelCache[cmd.conf.permLevel]) {
    return interaction.reply({content: "You do not have sufficient permissions to run this command", ephemeral: true});
  }

  // Try to run the command
  try {
    client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${interaction.user.username} (${interaction.user.id}) ran command ${cmd.help.name}`);
    await cmd.run(interaction);
  } catch (ex) {
    client.logger.error(ex);
  }
};