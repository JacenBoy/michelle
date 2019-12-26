const mongoose = require("mongoose");

const specialSchema = new mongoose.Schema({
  "_id": String,
  "horny": {
    "lastTime": String,
    "totalCount": Number
  },
  "servers": {
    "abuse": Number,
    "gratitude": Number
  }
});

module.exports = mongoose.Model("Special", specialSchema, {collection: "special"});