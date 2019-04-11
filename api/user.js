exports.name="user";

exports.run = async (client, req, res, args) => {
  if (!args[0]) return res.writeHead(400);
  if (! await client.users.has(args[0])) return res.writeHead(404);
  async function getResponse() {
    var userinfo = await client.users.get(args[0]);
    var response = {
      "id": userinfo.id,
      "name": userinfo.username,
      "discriminator": userinfo.discriminator,
      "avatar": userinfo.displayAvatarURL,
      "createdAt": userinfo.createdAt,
      "isBot": userinfo.bot,
      "status": userinfo.presence.status,
      "game": userinfo.presence.game || false
    };
    return response;
  }
  var info = await getResponse();
  res.writeHead(200, {"Content-Type": "application/json"});
  res.write(JSON.stringify(info));
};