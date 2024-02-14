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

routers.get('/spotifyplaylist', musicController.getPlaylist);

const playlistController = require('../controllers/playlistController');
routers.post('/playlist', playlistController.createUserPlaylist);

routers.get('/playlist/:email', playlistController.getUserPlaylist);
routers.put('/playlist/:name', playlistController.updateUserPlaylist);

const loginController = require('../controllers/loginController');
routers.post('/login', loginController.loginUser);


module.exports = routers;