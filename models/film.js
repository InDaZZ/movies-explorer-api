const mongoose = require('mongoose');
const validator = require('validator');

const filmSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validator: (v) => validator.isURL(v),
    message: 'Некорректный URL',
  },
  trailerLink: {
    type: String,
    required: true,
    validator: (v) => validator.isURL(v),
    message: 'Некорректный URL',
  },
  thumbnail: {
    type: String,
    required: true,
    validator: (v) => validator.isURL(v),
    message: 'Некорректный URL',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('film', filmSchema);