const qs = require("qs");
const axios = require("axios");

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

async function getSpotifyPlaylist(client_id, client_secret) {
  var response = await getSpotifyAuthToken(
    client_id,
    client_secret
  );
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

module.exports = { getSpotifyPlaylist };
