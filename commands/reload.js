exports.run = async (client, message, args, level) => {
  if (!args || args.length < 1) {
    args[0] = await client.awaitReply(message, "What command do you want to reload?", 15000);
    if (!args[0]) return client.logger.warn(`${message.author.username}'s request timed out.`);
  }

  const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

  let response = await client.unloadCommand(command.help.name);
  if (response) return message.channel.send(`Error Unloading: ${response}`);

  response = client.loadCommand(command.help.name);
  if (response) return message.channel.send(`Error Loading: ${response}`);

  message.channel.send(`The command \`${command.help.name}\` has been reloaded`);
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
