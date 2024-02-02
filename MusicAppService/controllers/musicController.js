const axios = require("axios");

async function getMusic(req, res) {
  const options = {
    method: "GET",
    url: "https://theaudiodb.p.rapidapi.com/searchalbum.php",
    params: { s: "daft_punk" },
    headers: {
      "X-RapidAPI-Key": "1b920d646cmsh26e02ac5bc96259p1556d6jsn825b186ee009",
      "X-RapidAPI-Host": "theaudiodb.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getMusic };
