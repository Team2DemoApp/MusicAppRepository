const axios = require("axios");
const qs = require("qs");

async function getMusic(req, res) {
  const options = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/playlist/%7Bid%7D",
    headers: {
      "X-RapidAPI-Key": "1b920d646cmsh26e02ac5bc96259p1556d6jsn825b186ee009",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
}

//spotify.com
async function getPlaylist(req, res) {
  var data = qs.stringify({
    grant_type: "client_credentials",
    client_id: "d458e0e2bb3f435aaf47e2cd20e78dcf",
    client_secret: "22cb731b9f8e4e1299892e3b7d957617"
  });

  var authOptions = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    json: true,
    data: data
  };
  try {
    const response = await axios.request(authOptions);
    console.log(response.data);
    console.log("Auth out : " + response.data.access_token);
    var token = response.data.access_token;

    //get playlist
    const options = {
      method: "GET",
      url: "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n",
      headers: {
        Authorization: "Bearer " + token
      }
    };

    try {
      const playlist = await axios.request(options);
      console.log("playlist.data " + playlist.data);
      res.send(playlist.data);
    } catch (error) {
      console.error("playlist 1 : " + error);
    }
  } catch (error) {
    console.error("playlist 2 : " + error);
  }
}

async function addPlaylist(req, res) {
  var data = qs.stringify({
    grant_type: "authorization_code",
    client_id: "d458e0e2bb3f435aaf47e2cd20e78dcf",
    client_secret: "22cb731b9f8e4e1299892e3b7d957617"
  });

  var authOptions = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    json: true,
    data: data
  };
  try {
    const response = await axios.request(authOptions);
    console.log(response.data);
    console.log("Auth out : " + response.data.access_token);

    var token = response.data.access_token;
    var data = qs.stringify({
      name: "New Playlist",
      description: "New playlist description",
      public: false
    });

    const options = {
      method: "POST",
      url: "https://api.spotify.com/v1/users/sushmita/playlists",
      headers: {
        Authorization: "Bearer " + token
      },
      data: data
    };

    try {
      const response1 = await axios.request(options);
      console.log("response1.data " + response1.data);
      res.send(response1.data);
    } catch (error) {
      console.error("Api1 : " + error);
    }
  } catch (error) {
    console.error("Api2 : " + error);
  }
}

async function getAuthToken(req, res) {
  var data = qs.stringify({
    grant_type: "client_credentials",
    client_id: req.body.client_id, //"d458e0e2bb3f435aaf47e2cd20e78dcf",
    client_secret: req.body.client_secret // "22cb731b9f8e4e1299892e3b7d957617"
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
    console.log(response.data);
    console.log("Auth out : " + response.data.access_token);
    res.send(response.data);
  } catch (error) {
    console.error("AuthError : " + error);
  }
}

module.exports = { getMusic, getPlaylist, addPlaylist, getAuthToken };
