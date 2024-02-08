const express = require("express");
const routers = express.Router();

const userController = require('../controllers/userController');
routers.post('/createUser', userController.createUser);
routers.get('/getAllUser', userController.getAllUser);

const musicController = require('../controllers/musicController');
routers.get('/music', musicController.getMusic);

routers.get('/playlist', musicController.getPlaylist);

routers.post('/addplaylist', musicController.addPlaylist);

routers.post('/getAuthToken', musicController.getAuthToken);

module.exports = routers;