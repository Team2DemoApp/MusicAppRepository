const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  songId: { type: Number, unique: true, auto: 1 },
  playlistId: { type: String },
  song: { type: String },
  like: { type: Boolean }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
