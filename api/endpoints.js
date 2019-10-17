exports.name = "endpoints";

exports.run = async (client, req, res, args) => {
  const getEndpoints = async () => {
    const eplist = [];
    Array.from(client.endpoints.values()).forEach(e => {
      eplist.push(e.name);
    });
    return {"endpoints": eplist.length, "methods": eplist};
  };
  const apilist = await getEndpoints();
  res.writeHead(200, {"Content-Type": "application/json"});
  res.write(JSON.stringify(apilist));
};