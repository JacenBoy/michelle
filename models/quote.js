const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  quote: String,
  attribution: String,
  source: {type: mongoose.Schema.Types.Mixed, default: false}
});

module.exports = mongoose.model("Quote", quoteSchema);