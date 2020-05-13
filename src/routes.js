const express = require('express');

const UserController = require('./controllers/UserController');
const FavoritesController = require('./controllers/FavoritesController');

const routes = express.Router();

routes.get('/favorites', FavoritesController.index);
routes.post('/favorites', FavoritesController.create);
routes.delete('/favorites', FavoritesController.delete);
module.exports = routes; //exportando as rotas