const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dateAndTime = require("date-and-time");
const date = new Date();

const messageShema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: dateAndTime.format(date, "hh:mm:ss A, MM-DD-YYYY"),
  },
});

module.exports = mongoose.model("message", messageShema);
