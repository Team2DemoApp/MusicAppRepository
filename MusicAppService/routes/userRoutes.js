const express = require("express");
const routers = express.Router();

const userController = require('../controllers/userController');
routers.post('/', userController.createUser);
routers.get('/', userController.getAllUser);

const musicController = require('../controllers/musicController');
routers.get('/music', musicController.getMusic);

module.exports = routers;