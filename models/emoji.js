const mongoose = require("mongoose");

const emojiSchema = new mongoose.Schema({
  idString: String,
  isCustom: Boolean,
  emoji: String
});

module.exports = mongoose.model("Emoji", emojiSchema);