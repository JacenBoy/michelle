// Pulls a random quote from a JSON file and displays it.

  exports.run = async (client, message, args, level) => {
    randquote = client.quotes.random();
    client.logger.debug(`Quote: ${randquote.quote}`);
    client.logger.debug(`Attribution: ${randquote.attribution}`);
    const embed = {"embed": {"description": randquote.quote, "description": randquote.attribution}};
    message.channel.send(embed);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "quote",
    category: "Entertainment",
    description: "Displays a random quote.",
    usage: "quote"
  };