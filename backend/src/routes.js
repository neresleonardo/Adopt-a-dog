const express = require('express');

// Require Controller
const UserController = require('./Controller/UserController');
const CasosController = require('./Controller/CasoController')
const ProfileController = require('./Controller/ProfileController');
const SessionController = require('./Controller/SessionController');


// Router
const routes = express.Router();

//Controller

routes.post('/sessions', SessionController.create);

routes.get('/user', UserController.index);
routes.post('/user', UserController.create);

routes.get('/profile', ProfileController.index);

routes.post('/casos', CasosController.create);
routes.get('/casos', CasosController.index);
routes.delete('/casos/:id', CasosController.delete);



module.exports = routes;