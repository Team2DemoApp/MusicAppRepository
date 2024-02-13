const qs = require("qs");
const axios = require("axios");
const Users = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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

async function userLogin(email, password) {

  try {
    const userData = await Users.findOne({ email });
   
    const isMatch = await bcrypt.compare(password, userData.password);
    
    const userToken = await userData.generateAuthToken();
  
    if (!userData) {
      return  "User not found";
    } else {
      if (isMatch) {
        return userToken;
      } else {
        return  "Invalid User Details!!" ;
      }
    }
  } catch (error) {
    return error;
  }
}

async function userCreate(username, email, password, rpassword) {

  try {
    if (password === rpassword) {
      const userRegister = new Users({
        username: username,
        email: email,
        password: password,
        rpassword: rpassword,
      });
      const registered = await userRegister.save();
      return registered;
    } 
    else 
    {
     return "Password is not Match";
    }
  } catch (error) {
    return error;
  }
}

async function userEdit(_id, username, email, password, rpassword) {
  try {
    const userData = await Users.findOne({ _id });
      if(!userData)
      {
        return "Invalid User!!";
      }else{
      const editUser = new Users({
        username: username,
        email:userData.email,
        password: password,
        rpassword: rpassword,
      });
      password = await bcrypt.hash(password, 10);
      rpassword = await bcrypt.hash(rpassword, 10);
      const getupdatedusers = await Users.findByIdAndUpdate({_id:_id }, { username: editUser.username,
        password:password,rpassword:rpassword },
        {
        new: true});
      return getupdatedusers;
    }
  } catch (error) {
    return error;
  }
}

async function userDelete(_id) {
  try {
    const userData = await Users.findOne({ _id });
      if(!userData)
      {
        return "Invalid User!!";
      }else{
      const getdeletedusers = await Users.findByIdAndDelete(_id);
      console.log(getdeletedusers);
      return getdeletedusers;
    }
  } catch (error) {
    return error;
  }
}

async function usersGet() {
  try {
    const userData = await Users.find({});
    return userData;
    }
   catch (error) {
    return error;
  }
}

async function usersGetById(_id) {
  try {
    const userData = await Users.findById({ _id });
    return userData;
    }
   catch (error) {
    return error;
  }
}


module.exports = { getSpotifyPlaylist, userLogin, userCreate , userEdit,userDelete,usersGet,usersGetById};
