const Playlist = require("../model/playlist");

// Create a new playlist
async function createUserPlaylist(req, res) {
  try {
    const { id, name, email, songs } = req.body;
    const playlist = new Playlist({ id, name, email, songs });
    await playlist.save();
    res.send(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// Get playlist
async function getUserPlaylist(req, res) {
  try {
    const playlist = await Playlist.find({
      email: { $regex: req.params.email }
    });
    res.send(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// Edit playlist
async function updateUserPlaylist(req, res) {
  try {
      console.log(req.body);
    const { name } = req.params;
    const { songs } = req.body;
    const playlist = await Playlist.findOne({ name: name });
    if (!playlist) {
      return next();
    }

    const updatedPlaylist = await playlist.updateOne(
      {
        name: name
      },
      {
        songs: songs
      },
      { upsert: true }
    );

    res.send(updatedPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = { createUserPlaylist, getUserPlaylist, updateUserPlaylist };
