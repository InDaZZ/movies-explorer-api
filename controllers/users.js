const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../error/not-found-err');
const BadRequest = require('../error/bad-request-err');
const Emailexists = require('../error/email-exists-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const creatUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Emailexists('Email уже исользуется'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Переданы невалидные данные'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      // вернём токен
      res
        .cookie('jwt', token, {
          // token - наш JWT токен, который мы отправляем
          maxAge: 31536000,
          SameSite: 'none',
          domain: '.api.movies-project.nomoredomains.xyz',
          secure: true,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const getUserMe = (req, res, next) => {
  const userId = req.user._id;
  console.log(req.cookies.jwt._id);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequest('Пользователь не найден'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
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

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'Cookies clear' });
};

module.exports = {
  creatUser,
  login,
  getUserMe,
  updateUser,
  logout,
};