const axios = require("axios");
const { getSpotifyMusicList } = require("../services/service.js");

//deezer
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
async function getMusicList(req, res) {
  try {
    var response = await getSpotifyMusicList(
      req.body.client_id,
      req.body.client_secret
    );
    res.send(response);
  } catch (error) {
    res.send(res.statusCode + ":" + error);
    console.error("getPlaylist : " + error);
  }
}

module.exports = { getMusic, getMusicList };
