var playlistService = require("../services/playlistService");

// Create a new playlist
async function createUserPlaylist(req, res) {
  try {
    const playlist = await playlistService.createUserPlaylist(
      req.body.name,
      req.userinfo.email,
      req.body.songs
    );
    res.status(200).json({
      Message: "User playlist created",
      playlist
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// Get playlist
async function getUserPlaylist(req, res) {
  try {
    const playlist = await playlistService.getUserPlaylist(req.userinfo.email);
    res.send(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// Add song to playlist
async function addSongToUserPlaylist(req, res) {
  try {
    const playlistData = await playlistService.addSongToUserPlaylist(
      req.body._id,
      req.body.songs,
      req.userinfo.email
    );
    res.status(200).json({
      playlistData
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// Edit playlist
async function setFavourite(req, res) {
  try {
    const songData = await playlistService.setFavourite(
      req.body._id,
      req.body.like
    );
    res.status(200).json({
      Message: "Song's favourite updated",
      songData
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//Get songs of playlist
async function getSongsByPlaylistId(req, res) {
  try {
    songs = await playlistService.getSongsByPlaylistId(req.body.playlistId,req.userinfo.email);
    res.status(200).json({
      songs
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//Add comment to song
async function addComment(req, res) {
  try {
    const commentData = await playlistService.addComment(
      req.body._id,
      req.body.comment
    );
    res.status(200).json({
      Message: "Comment added",
      commentData
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

// Delete song from playlist
async function deleteSongFromPlaylist(req, res) {
  try {
    await playlistService.deleteSongFromPlaylist(
      req.body._id
    );
    res.status(200).json({
      Message: "Song deleted from the playlist"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = {
  createUserPlaylist,
  getUserPlaylist,
  addSongToUserPlaylist,
  setFavourite,
  getSongsByPlaylistId,
  addComment,
  deleteSongFromPlaylist
};
