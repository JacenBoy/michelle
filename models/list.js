const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  _id: String,
  kitsu: {type: String, default: ""},
  mal: {type: String, default: ""},
  anilist: {type: String, default: ""}
});

module.exports = mongoose.model("List", listSchema);