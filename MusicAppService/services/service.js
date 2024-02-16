const qs = require("qs");
const axios = require("axios");
const Playlist = require("../model/playlist");
const Song = require("../model/song");
const Users = require("../model/user");
const bcrypt = require("bcryptjs");

async function getSpotifyAuthToken(client_id, client_secret) {
  var data = qs.stringify({
    grant_type: "client_credentials",
    client_id: client_id, //"d458e0e2bb3f435aaf47e2cd20e78dcf",
    client_secret: client_secret // "22cb731b9f8e4e1299892e3b7d957617"
  });

  var authOptions = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: data
  };
  try {
    const response = await axios.request(authOptions);
    console.log("response --" + response);
    return response;
  } catch (error) {
    console.error("getSpotifyAuthToken : " + error);
  }
}

async function getSpotifyMusicList(client_id, client_secret) {
  var response = await getSpotifyAuthToken(client_id, client_secret);
  var token = response.data.access_token;
  try {
    //get playlist
    const options = {
      method: "GET",
      url: "https://api.spotify.com/v1/browse/new-releases", //"https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n",
      headers: {
        Authorization: "Bearer " + token
      }
    };
    const playlist = await axios.request(options);
    return playlist.data;
  } catch (error) {
    return res.statusCode + ":" + error;
  }
}

// Create a new playlist
async function createUserPlayList(name, email, songs) {
  try {
    const playlist = new Playlist({ name, email, songs });
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
async function getUserPlayList(email) {
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
async function updateUserPlaylist(_id, name, songs) {
  try {
    const playlistData = await Playlist.findOne({ _id });
    if (!playlistData) {
      return "Invalid Playlist";
    } else {
      const updatePlaylist = new Playlist({
        name: name,
        email: playlistData.email,
        songs: songs
      });
      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        { _id: _id },
        {
          name: updatePlaylist.name,
          email: updatePlaylist.email,
          songs: updatePlaylist.songs
        },
        {
          new: true
        }
      );
      return updatedPlaylist;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function createPlaylistSong(playlistId, playlistSongs) {
  try {
    var songs = playlistSongs.split(",");
    let data = [];
    songs.forEach(function(value) {
      data.push({ playlistId: playlistId, song: value, like: false });
    });

    const options = { ordered: true };
    return await Song.insertMany(data, options);
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function loginUser(email, password) {
  try {
    const userData = await Users.findOne({ email });
    const isMatch = await bcrypt.compare(password, userData.password);
    const userToken = await userData.generateAuthToken();

    if (!userData) {
      return "User not found";
    } else {
      if (isMatch) {
        return userToken;
      } else {
        return "Invalid User Details!!";
      }
    }
  } catch (error) {
    return error;
  }
}

async function createUser(username, email, password, rpassword) {
  try {
    if (password === rpassword) {
      const userRegister = new Users({
        username: username,
        email: email,
        password: password,
        rpassword: rpassword
      });
      const registered = await userRegister.save();
      return registered;
    } else {
      return "Password is not Match";
    }
  } catch (error) {
    return error;
  }
}

async function editUser(_id, username, email, password, rpassword) {
  try {
    const userData = await Users.findOne({ _id });
    if (!userData) {
      return "Invalid User!!";
    } else {
      const editUser = new Users({
        username: username,
        email: userData.email,
        password: password,
        rpassword: rpassword
      });
      password = await bcrypt.hash(password, 10);
      rpassword = await bcrypt.hash(rpassword, 10);
      const getupdatedusers = await Users.findByIdAndUpdate(
        { _id: _id },
        {
          username: editUser.username,
          password: password,
          rpassword: rpassword
        },
        {
          new: true
        }
      );
      return getupdatedusers;
    }
  } catch (error) {
    return error;
  }
}

async function deleteUser(_id) {
  try {
    const userData = await Users.findOne({ _id });
    if (!userData) {
      return "Invalid User!!";
    } else {
      const getdeletedusers = await Users.findByIdAndDelete(_id);
      console.log(getdeletedusers);
      return getdeletedusers;
    }
  } catch (error) {
    return error;
  }
}

async function getUsers() {
  try {
    const userData = await Users.find({});
    return userData;
  } catch (error) {
    return error;
  }
}

async function getUsersById(_id) {
  try {
    const userData = await Users.findById({ _id });
    return userData;
  } catch (error) {
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

module.exports = {
  getSpotifyMusicList,
  createUserPlayList,
  getUserPlayList,
  updateUserPlaylist,
  createPlaylistSong,
  loginUser,
  createUser,
  editUser,
  deleteUser,
  getUsers,
  getUsersById,
  setFavourite
};
