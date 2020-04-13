const Router = require("express").Router();
const { check, validationResult } = require("express-validator");

//Message Model
const Message = require("../models/Message");
//User Model
const User = require("../models/User");

/*
    POST message,
    Access Public
*/
Router.post(
  "/:username/message",
  [check("text", "Please Provide Message").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { text } = req.body;

    try {
      const user = await User.findOne({ username: req.params.username }).select(
        "-password"
      );

      if (!user) {
        res.json({ error: [{ msg: "User does not found" }] });
      }

      let message = new Message({
        user: user.id,
        text,
      });

      message = await message.save();

      res.status(200).json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: [{ msg: "Server Error" }] });
    }
  }
);

module.exports = Router;
