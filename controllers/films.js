const Film = require('../models/film');

const NotFoundError = require('../error/not-found-err');
const BadRequest = require('../error/bad-request-err');

const createFilm = (req, res, next) => {
  const {
    country,
    director,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    duration,
  } = req.body;
  const owner = req.user;
  Film.create({
    country,
    director,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    duration,
    owner,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы невалидные данные'));
      }
      return next(err);
    });
};

const getFilms = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Film.find({ owner });
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

const deleteFilm = (req, res, next) => {
  const userId = req.params;
  Film.findById(userId)
    .then((film) => {
      if (!film) {
        throw new NotFoundError('Фильма с таким id не существует');
      }
      Film.deleteOne(film._id)
        .then(() => res.send({ data: film }));
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы невалидные данные'));
      }
      return next(err);
    });
};

module.exports = {
  createFilm,
  getFilms,
  deleteFilm,
};