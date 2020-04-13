const Router = require("express").Router();
const auth = require("../middleware/auth");

//Message Model
const Message = require("../models/Message");

/*
    GET messages,
    Access Private
*/

Router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: [{ msg: "Server Error" }] });
  }
});

/*
    GET messages in reverse,
    Access Private
*/
Router.get("/reverse", auth, async (req, res) => {
  try {
    const messages = await (
      await Message.find({ user: req.user.id })
    ).reverse();
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: [{ msg: "Server Error" }] });
  }
});

/*
    DELETE message,
    Access Private
*/
Router.delete("/:id", auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: [{ msg: "Message Not Found" }] });
    }

    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: { status: true } });
  } catch (err) {
    res.status(500).json({ error: [{ msg: "Server Error" }] });
  }
});

module.exports = Router;
