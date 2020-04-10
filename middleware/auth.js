require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ error: [{ msg: "No Token, Access Denied" }] });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ error: [{ msg: "Invalid Token" }] });
  }
};

module.exports = auth;
