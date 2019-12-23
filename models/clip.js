const mongoose = require("mongoose");

const clipSchema = new mongoose.Schema({
  enid: String,
  jpid: {type: mongoose.Schema.Types.Mixed, default: false},
  title: String,
  source: String,
  season: Number,
  episode: Number,
  isSpoiler: {type: Boolean, default: false}
});

module.exports = mongoose.model("Clip", clipSchema);