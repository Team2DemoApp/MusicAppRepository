const express = require("express");
const routers = express.Router();
const auth = require("../middleware/auth");

const userController = require("../controllers/userController");
routers.get("/getUsers", auth, userController.getUsers);
routers.get("/getUser", auth, userController.getUsersById);
routers.post("/createUser", userController.createUser);
routers.post("/editUser", auth, userController.editUser);
routers.delete("/deleteUser", auth, userController.deleteUser);
routers.post("/createAvatar", auth, userController.createAvatar);
routers.get("/getAvatar", auth, userController.getAvatar);

const musicController = require("../controllers/musicController");
routers.get("/music", musicController.getMusic);
routers.get("/spotifymusiclist", musicController.getMusicList);

const playlistController = require("../controllers/playlistController");
routers.post("/createplaylist", auth, playlistController.createUserPlaylist);
routers.get("/playlist", auth, playlistController.getUserPlaylist);
routers.put("/editplaylist", auth, playlistController.addSongToUserPlaylist);
routers.delete("/deletesong", auth, playlistController.deleteSongFromPlaylist);
routers.put("/favourite", auth, playlistController.setFavourite);
routers.get("/playlistsongs", auth, playlistController.getSongsByPlaylistId);
routers.post("/addComment", auth, playlistController.addComment);

const loginController = require("../controllers/loginController");
routers.post("/login", loginController.loginUser);
routers.post("/recoverpassword", loginController.changePassword);

module.exports = routers;
