const express = require("express");
const routers = express.Router();

const userController = require('../controllers/userController');
routers.post('/createUser', userController.createUser);
routers.get('/getAllUser', userController.getAllUser);

const musicController = require('../controllers/musicController');
routers.get('/music', musicController.getMusic);

routers.get('/spotifyplaylist', musicController.getPlaylist);

routers.post('/getAuthToken', musicController.getAuthToken);

const playlistController = require('../controllers/playlistController');
routers.post('/playlist', playlistController.createUserPlaylist);

routers.get('/playlist/:email', playlistController.getUserPlaylist);
routers.put('/playlist/:name', playlistController.updateUserPlaylist);

module.exports = routers;