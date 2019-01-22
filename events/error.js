/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
module.exports = async (client, error) => {
  client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
};
