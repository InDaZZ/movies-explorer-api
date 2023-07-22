const filmsRouter = require('express').Router();

const { createFilm, getFilms, deleteFilm } = require('../controllers/films');

const { createFilmValidation } = require('../middleware/filmValidation');

filmsRouter.post('/movies', createFilmValidation, createFilm);
filmsRouter.get('/movies', getFilms);
filmsRouter.delete('/movies/:_id', deleteFilm);

module.exports = filmsRouter;