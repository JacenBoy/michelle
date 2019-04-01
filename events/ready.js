/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  // Manually send stats to DiscordBotList.com like some techinically illiterate moron
  if (client.config.dblcomtoken) client.dblcomStats(client.config.dblcomtoken);

  // Also set up a timer to post to Bots On Discord, like that aforementioned moron
  if (client.config.bodtoken) setInterval(client.bodStats, 5 * 60 * 1000, client.config.bodtoken);
};
