const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

//User model
const User = require("../models/User");

/*
    CHECK USER,
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
    res.status(500).json({ error: [{ msg: "Server Error" }] });
  }
});

/*
    GET USER,
    Access Private
*/
Router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: [{ msg: "Server Error" }] });
  }
});

/*
    Login user
    Access Private
*/
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
    check(
      "password",
      "Password have to be minimum 6 characters and valid"
    ).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({
          error: [{ msg: "Invalid Credential" }],
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({
          error: [{ msg: "Invalid Credential" }],
        });
      }

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
      res.status(500).json({ error: [{ msg: "Server Error" }] });
    }
  }
);

module.exports = Router;
