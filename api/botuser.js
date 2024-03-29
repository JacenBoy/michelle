exports.name = "botuser";

exports.run = async (client, req, res, args) => {
  async function getResponse() {
    const response = {};
    const botuser = await client.user;
    response.id = botuser.id;
    response.name = botuser.username;
    response.discriminator = botuser.discriminator;
    response.avatar = botuser.displayAvatarURL();
    return response;
  }

  const info = await getResponse();
  res.writeHead(200, {"Content-Type": "application/json"});
  res.write(JSON.stringify(info));
};