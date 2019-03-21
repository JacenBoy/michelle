/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Search Kitsu for an anime

exports.run = async (client, message, args, level) => {
  const mal = require("mal-scraper");
  if (!args[0]) {
    var aniname = await client.awaitReply(message, "What is the name of the anime you want to search for?", 15000);
    if (!aniname) return client.logger.warn(`${message.author.username}'s request timed out.`);
  }
  else var aniname = args.join(" ");
  var embed;
  var results = await mal.getResultsFromSearch(aniname);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "anime",
  category: "MyAnimeList",
  description: "Show information about an anime on MyAnimeList.",
  usage: "anime [name]"
};