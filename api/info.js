exports.name = "info";

exports.run = async (client, req, res, args) => {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.write(JSON.stringify({
    "username": client.user.username,
    "version": process.env.npm_package_version,
    "users": client.users.size,
    "guilds": client.guilds.size
  }));
};