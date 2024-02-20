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

// Edit playlist
async function setFavourite(req, res) {
  try {
    const songData = await UserService.setFavourite(
      req.body._id,
      req.body.like
    );
    res.status(200).json({
      Message: "Song's Favourite Updated",
      songData
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

async function getSongsByPlayListId(req, res) {
  try {
    songs = await UserService.getSongsByPlayListId(req.body.playlistId);
    res.status(200).json({
      songs
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//Add comment
async function addComment(req, res) {
  try {
    const _id = req.params.id;
    const { comment } = req.body;
    const userComment = await UserService.addComment(
      _id,
      comment
    );
    if (!userComment) {
      res.status(401).json({
        Message: "Comment is Not Updated"
      });
    }
    else {
      res.status(200).json({
        Message: "Comment is Updated",
        userComment
      });
    }
  }
  catch (err) {
    res.status(500).send(error);
  }
}

//Gets comments
async function getComment(req, res) {
  try {
    const playlist = await UserService.getUserPlayList(req.userinfo.email);
    res.send(playlist.comment);
    // const _id = req.params.id;
    // const userCommentData = await UserService.getComment(_id);
    // if (!userCommentData) {
    //   res.status(401).json({
    //     Message: "No Users"
    //   });
    // } else {
    //   res.status(200).send(userCommentData.comment);
    // }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createUserPlayList,
  getUserPlayList,
  updateUserPlaylist,
  setFavourite,
  getSongsByPlayListId,
  addComment,
  getComment
};
