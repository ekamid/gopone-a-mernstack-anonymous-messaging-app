const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageShema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date()
  }
});

module.exports = mongoose.model("message", messageShema);
