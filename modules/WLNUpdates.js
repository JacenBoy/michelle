const fetch = require("node-fetch");

module.exports = class WLNUpdates {
  constructor (endpoint = "https://www.wlnupdates.com/api") {
    this.endpoint = endpoint;
  }

  async getLN (title, mode = "search-title") {
    if (!title) throw "No title provided.";
    const results = await fetch(this.endpoint, {
      method: "POST",
      body: JSON.stringify({"title": title, "mode": mode}),
      headers: {"Content-Type": "application/json"}
    }).then(res => res.json());
    if (results.error) throw new Error(results.message);
    else return results.data;
  }
};