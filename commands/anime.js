/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
// Search Kitsu for an anime

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
    var aniresult = results[0].attributes;
    if (!aniresult.titles) {
      message.channel.send("No results found");
      return;
    }
    var anititle = aniresult.titles.en;
    if (!aniresult.titles.en) {
      anititle = aniresult.titles.en_jp;
    }
    var strsyn;
    if (aniresult.synopsis == "") {
      strsyn = "No synopsis available";
    } else {
      strsyn = aniresult.synopsis;
    }
    if (strsyn.length >= 1024) {
      strsyn = strsyn.substring(0, strsyn.lastIndexOf(" ", 1017)) + " (more)";
    }
    var anirating = aniresult.averageRating;
    if (!anirating) {
      anirating = 0;
    }
    var epcount = aniresult.episodeCount;
    if (!epcount) {
      epcount = 0;
    }
    var anistatus;
    if (aniresult.status == "tba") {
      anistatus = "TBA";
    } else {
      anistatus = `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`;
    }
    embed = { "embed": {
      "title": anititle,
      "url": "https://kitsu.io/anime/" + aniresult.slug,
      "description": strsyn,
      "image": { "url": aniresult.posterImage.small },
      "fields": [
        { "name": "Rating:", "value": anirating + "% Approval", "inline": true },
        { "name": "Episodes:", "value":  epcount.toString() + " (" + aniresult.subtype + ")", "inline": true },
        { "name": "Status:", "value": anistatus, "inline": true }
      ]
    } };
    message.channel.send(embed);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "anime",
  category: "Kitsu",
  description: "Show information about an anime on Kitsu.",
  usage: "anime [name]"
};