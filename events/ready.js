module.exports = async client => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  await client.wait(1000);

  // Manually send stats to DiscordBotList.com and Bots On Discord like some techinically illiterate moron
  if (!client.statstimer) { // Make sure not to create multiple instances of the interval
    client.statstimer = setInterval( () => {
      if (client.config.dblcomtoken) client.dblcomStats(client.config.dblcomtoken);
      if (client.config.bodtoken) client.bodStats(client.config.bodtoken);
      if (client.config.dbggtoken) client.dbggStats(client.config.dbggtoken);
    }, 5 * 60 * 1000);
  }

  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.guilds.cache.size} servers.`, "ready");

  // Deploy our slash commands
  // Global commands may take up to two hours to deploy, while guild commands are deployed immediately
  // Therefore we'll loop through all of our guilds to deploy the commands that way
  client.deployCommands();
};
