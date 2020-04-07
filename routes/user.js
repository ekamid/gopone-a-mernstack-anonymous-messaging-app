const Router = require("express").Router();

//User Model
const User = require("../models/User");

/*
    GET USER,
    Access Public
*/
Router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );

    if (!user) {
      res.json({ exist: false });
    } else {
      res.json({ exist: true });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = Router;
