exports.name = "guilds";

exports.run = async (client, req, res, args) => {
  async function getResponse() {
    var response = {};
    response.count = client.guilds.size;
    response.guilds = [];
    client.guilds.array().forEach(async g => {
      if (!g.available || g.deleted) return;
      const owner = await g.fetchMember(g.ownerID);
      response.guilds.push({
        "id": g.id,
        "name": g.name,
        "icon": g.iconURL,
        "members": g.members.size,
        "channels": g.channels.size,
        "owner": {
          "id": owner.id,
          "name": owner.user.username,
          "nickname": owner.nickname,
          "avatar": owner.user.avatarURL || owner.user.defaultAvatarURL
        }
      });
    });
    return response;
  }
  var info = await getResponse();
  res.writeHead(200, {"Content-Type": "application/json"});
  res.write(JSON.stringify(info));
};