const express = require('express');

// Require Controller
const UserController = require('./Controller/UserController');


// Router
const routes = express.Router();

//Controller

routes.get('/user', UserController.index);
routes.post('/user', UserController.create);



module.exports = routes;