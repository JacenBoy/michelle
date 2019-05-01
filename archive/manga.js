// Search Kitsu for a manga

exports.run = async (client, message, args, level) => {
  if (!args[0]) {
    var aniname = await client.awaitReply(message, "What is the name of the manga you want to search for?", 15000);
    if (!aniname) return client.logger.warn(`${message.author.username}'s request timed out.`);
  }
  else var aniname = args.join(" ");
  var embed;
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: "manga",
  category: "MyAnimeList",
  description: "Show information about a manga on MyAnimeList.",
  usage: "manga [name]"
};