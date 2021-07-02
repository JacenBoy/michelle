const mongoose = require("mongoose");

const specialSchema = new mongoose.Schema({
  "_id": String,
  "horny": {
    "lastTime": String,
    "totalCount": Number
  },
  "abuse": Number,
  "gratitude": Number
});

module.exports = mongoose.model("Special", specialSchema, "special");