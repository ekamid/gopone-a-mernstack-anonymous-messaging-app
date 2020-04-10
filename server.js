const express = require("express");

//init app
const app = express();

//connect mongodb
const connectDB = require("./config/db");
connectDB();

//express parser middleware
app.use(express.json({ extended: true }));

//for heroku deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//routes
app.use("/api/register", require("./routes/register"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/", require("./routes/message"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running in port ${PORT}`);
});
