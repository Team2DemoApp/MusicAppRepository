const Playlist = require("../model/playlist");
const Song = require("../model/song");

// Create playlist
async function createUserPlaylist(name, email, songs) {
  try {
    const playlist = new Playlist({ name, email });
    var createdPlaylist = await playlist.save();
    const playlistId = createdPlaylist._id;
    const id = playlistId.toString();
    await createPlaylistSong(id, songs);
    return createdPlaylist;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Get playlist
async function getUserPlaylist(email) {
  try {
    const playlist = await Playlist.find({
      $where: "this.email === '" + email + "'"
    });
    return playlist;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Edit playlist
async function addSongToUserPlaylist(_id, songs, email) {
  try {
    const playlist = await Playlist.find({
      $and: [{ _id: _id }, { email: email }]
    });
    if (playlist.length === 0) {
      return "Playlist does not exists for logged in user";
    } else {
      await createPlaylistSong(_id, songs);
      const updatedPlaylist = await Song.find({
        $where: "this.playlistId === '" + _id.toString() + "'"
      });
      return updatedPlaylist;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

//Create songs for playlist
async function createPlaylistSong(playlistId, playlistSongs) {
  try {
    var songs = playlistSongs.split(",");
    let data = [];
    songs.forEach(function(value) {
      data.push({
        playlistId: playlistId,
        song: value,
        like: false,
        comment: ""
      });
    });

    const options = { ordered: true };
    return await Song.insertMany(data, options);
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Set like/unlike
async function setFavourite(_id, isLike) {
  try {
    const songData = await Song.findOne({ _id });
    if (!songData) {
      return "Invalid Song";
    } else {
      const updateSong = new Song({
        playlistId: songData.playlistId,
        song: songData.song,
        like: isLike
      });
      const updatedSong = await Song.findByIdAndUpdate(
        { _id: _id },
        {
          playlistId: updateSong.playlistId,
          song: updateSong.song,
          like: updateSong.like
        },
        {
          new: true
        }
      );
      return updatedSong;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Get playlist songs
async function getSongsByPlaylistId(playlistId, email) {
  try {
    const playlist = await Playlist.find({
      $and: [{ _id: playlistId }, { email: email }]
    });
    if (playlist.length === 0) {
      return "Playlist does not exists for logged in user";
    }

    let songsData = [];
    const songs = await Song.find({
      $where: "this.playlistId === '" + playlistId + "'"
    });

    const _id = playlistId;
    const playlistName = await Playlist.findOne({ _id });
    songs.forEach(function(value) {
      songsData.push({
        playlistId: value.playlistId,
        playlistName: playlistName["name"],
        songId: value._id.toString(),
        song: value.song,
        like: value.like,
        comment: value.comment
      });
    });
    return songsData;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//Add comment for song
async function addComment(_id, comment) {
  try {
    const songData = await Song.findOne({ _id });
    if (!songData) {
      return "Invalid Song";
    } else {
      const updateSong = new Song({
        playlistId: songData.playlistId,
        song: songData.song,
        comment: comment
      });
      const userComment = await Song.findByIdAndUpdate(
        { _id: _id },
        {
          playlistId: updateSong.playlistId,
          song: updateSong.song,
          comment: comment
        },
        {
          new: true
        }
      );
      return userComment;
    }
  } catch (error) {
    return error;
  }
}

// Delete song
async function deleteSongFromPlaylist(_id) {
  try {
    const songData = await Song.findOne({ _id });
    if (!songData) {
      return "Invalid Song";
    } else {
      await Song.deleteOne({ _id });
      return true;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  createUserPlaylist,
  getUserPlaylist,
  addSongToUserPlaylist,
  createPlaylistSong,
  setFavourite,
  getSongsByPlaylistId,
  addComment,
  deleteSongFromPlaylist
};
