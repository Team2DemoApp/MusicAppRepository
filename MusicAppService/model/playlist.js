const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String }
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;