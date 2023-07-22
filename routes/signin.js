const signinRouter = require('express').Router();

const {
  login,
} = require('../controllers/users');

const { signInValidation } = require('../middleware/userValidation');

signinRouter.post('/signin', signInValidation, login);

module.exports = signinRouter;