const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  id: { type: Number, unique: true, auto: 1},
  name: { type: String, unique: true},
  email: String,
  songs: String
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;