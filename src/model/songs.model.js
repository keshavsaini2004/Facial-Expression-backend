const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  audioFile: String,
  mood: String
});

const songModel = mongoose.model("Song", songSchema, "all-songs");

module.exports = songModel;