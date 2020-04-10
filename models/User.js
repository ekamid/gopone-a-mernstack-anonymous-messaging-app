const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
