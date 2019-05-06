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
  if (!results[0]) {
    message.channel.send("No results found");
    client.logger.warn(`No anime found for search term "${aniname}"`);
    return;
  }
  var i = 0;
  while (results[i].type.toLowerCase() != "anime") {
    i++;
  }
  var fresult = results[i];
  embed = { "embed": {
    "title": `${fresult.name || "No title provided"} (${fresult.payload.media_type})`,
    "url": fresult.url,
    "image": { "url": fresult.image_url },
    "fields": [
      { "name": "Rating:", "value": fresult.payload.score, "inline": true },
      { "name": "Status:", "value": fresult.payload.status, "inline": true}
    ],
    "footer": { "text": "The output of this command has been temporarily scaled back while Kitsu is offline. See https://kitsu.io for more info." }
  } };
  message.channel.send(embed);
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