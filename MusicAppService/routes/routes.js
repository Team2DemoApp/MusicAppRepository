const express = require("express");
const routers = express.Router();
const auth = require("../middleware/auth")

const userController = require('../controllers/userController');
routers.get('/getUsers',auth, userController.getUsers);
routers.get('/getUser/:id',auth, userController.getUsersById);
routers.post('/createUser', userController.createUser);
routers.post('/editUser/:id',auth, userController.editUser);
routers.delete('/deleteUser/:id',auth, userController.deleteUser);

const musicController = require('../controllers/musicController');
routers.get('/music', musicController.getMusic);

routers.get('/spotifymusiclist', musicController.getMusicList);

const playlistController = require('../controllers/playlistController');
routers.post('/playlist',auth, playlistController.createUserPlayList);
routers.get('/playlist',auth, playlistController.getUserPlayList);
routers.put('/playlist',auth, playlistController.updateUserPlaylist);
routers.put('/favourite',auth, playlistController.setFavourite);
routers.get('/songs',auth, playlistController.getSongsByPlayListId);

const loginController = require('../controllers/loginController');
routers.post('/login', loginController.loginUser);
routers.post('/recoverpasswords', loginController.changePassword);

module.exports = routers;