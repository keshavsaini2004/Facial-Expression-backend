const express = require("express");
const songRoute = require("./router/songs.router");

const app = express();

app.get("/", (req, res) => {
  res.send("Facial Expression Music API is running 🚀");
});

app.use("/api", songRoute);

module.exports = app;