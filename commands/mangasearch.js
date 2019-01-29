/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Search Kitsu for multiple manga

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send('Please enter a manga name.');
    var embed;
    var aniname = "";
    for (var i=0;i<args.length;i++) {
      aniname += args[i];
      if (i != args.length - 1) {
        aniname += " ";
      }
    }
    client.kitsu.searchManga(aniname, 0).then(results => {
      if (!results[0].attributes.titles) {
        message.channel.send("No results found");
        client.logger.warn(`No manga found for search term "${aniname}"`);
        return;
      }
      var fieldarry = [];
      for (var i=0;i<results.length;i++) {
          var aniresult = results[i].attributes;
          var anititle = aniresult.titles.en || aniresult.titles.en_jp || aniresult.canonicalTitle;
          var anirating = aniresult.averageRating || 0;
          var epcount = aniresult.chapterCount || 0;
          var anistatus = aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`;
          fieldarry[i] = { "name": anititle, "value": `Rating: ${anirating.toString()}%\nChapters: ${epcount.toString()}\nStatus: ${anistatus}\n[Kitsu.io](https://kitsu.io/manga/${aniresult.slug})`};
          if (!anititle) return message.channel.send( { "embed": { "description": "An error occurred displaying the results of your search. This is a [known issue](https://github.com/JacenBoy/michelle/issues/15). Please try a different search." } } );
      }
      embed = { "embed": { "title": "Search Results", "description": "\u200b", "fields": fieldarry } }
      message.channel.send(embed);
      client.logger.log(`Results found for search term "${aniname}"`);
    });
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['msearch', 'ms'],
    permLevel: "User"
  };
  
  exports.help = {
    name: "mangasearch",
    category: "Kitsu",
    description: "List the top ten results for a manga.",
    usage: "mangasearch [name]"
  };