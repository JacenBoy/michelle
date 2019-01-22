/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Search Kitsu for multiple anime

exports.run = async (client, message, args, level) => {
    var embed;
    var aniname = "";
    for (var i=0;i<args.length;i++) {
      aniname += args[i];
      if (i != args.length - 1) {
        aniname += " ";
      }
    }
    client.kitsu.searchAnime(aniname, 0).then(results => {
      if (!results[0].attributes.titles) {
        message.channel.send("No results found");
        return;
      }
      var fieldarry = [];
      for (var i=0;i<results.length;i++) {
          var aniresult = results[i].attributes;
          var anititle = aniresult.titles.en || aniresult.titles.en_jp;
          var anirating = aniresult.averageRating || 0;
          var epcount = aniresult.episodeCount || 0;
          var anistatus = aniresult.status == "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`;
          fieldarry[i] = { "name": anititle, "value": `Rating: ${anirating.toString()}%\nEpisodes: ${epcount.toString()}\nStatus: ${anistatus}\n[Kitsu.io](https://kitsu.io/anime/${aniresult.slug})`};
      }
      embed = { "embed": { "title": "Search Results", "description": "\u200b", "fields": fieldarry } }
      message.channel.send(embed);
    });
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['asearch', 'as'],
    permLevel: "User"
  };
  
  exports.help = {
    name: "animesearch",
    category: "Kitsu",
    description: "List the top ten results for an anime.",
    usage: "animesearch [name]"
  };