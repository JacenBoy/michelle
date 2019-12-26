exports.run = async (client, message, args, level) => {
  args.forEach(async (cmd) => {
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    let response = await client.unloadCommand(command.help.name);
    if (response) return message.channel.send(`Error Unloading: ${response}`);

    response = client.loadCommand(command.help.name);
    if (response) return message.channel.send(`Error Loading: ${response}`);

    await message.channel.send(`The command \`${command.help.name}\` has been reloaded`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  special: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command that\"s been modified.",
  usage: "reload [command]"
};
