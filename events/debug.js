/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
module.exports = async client => {
  // Manually send stats to DiscordBotList.com like some techinically illiterate moron
  if (client.config.dblcomtoken) client.dblcomStats(client.config.dblcomtoken);
};