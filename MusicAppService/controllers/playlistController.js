var UserService = require("../services/service");

// Create a new playlist
async function createUserPlayList(req, res) {
  try {
    const playlist = await UserService.createUserPlayList(
      req.body.name,
      req.userinfo.email,
      req.body.songs
    );
    res.status(200).json({
      Message: "User Playlist Created",
      playlist
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// Get playlist
async function getUserPlayList(req, res) {
  try {
    const playlist = await UserService.getUserPlayList(req.userinfo.email);
    res.send(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// Edit playlist
async function updateUserPlaylist(req, res) {
  try {
    const playlistData = await UserService.updateUserPlaylist(
      req.body._id,
      req.body.name,
      req.body.songs
    );
    res.status(200).json({
      Message: "User Playlist Updated",
      playlistData
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = { createUserPlayList, getUserPlayList, updateUserPlaylist };
