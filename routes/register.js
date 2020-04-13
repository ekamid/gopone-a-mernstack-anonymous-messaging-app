const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");

//User model
const User = require("../models/User");

Router.post(
  "/",
  [
    check(
      "username",
      "Please provide a minimum 5 characters, spacefree username"
    )
      .isLength({
        min: 5,
      })
      .custom((value) => !/\s/.test(value)), //space free or not
    check("password", "Password have to be minimum 6 characters").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          error: [{ msg: "User is exist. Try new one" }],
        });
      }

      user = new User({
        username,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
        if (error) throw error;
        res.send({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        error: [{ msg: "Server Error" }],
      });
    }
  }
);

module.exports = Router;
