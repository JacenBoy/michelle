exports.name = "horny";

exports.run = async (client, req, res, args) => {
  var info = [];
  const indexes = client.horny.indexes;
  const values = Array.from(client.horny.values());
  for (var i=0; i < indexes.length; i++) {
    info.push({"id": indexes[i], "totalCount": values[i].totalCount, "lastTime": values[i].lastTime});
  }

  res.writeHead(200, {"Content-Type": "application/json"});
  res.write(JSON.stringify(info));
};