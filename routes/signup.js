const signupRouter = require('express').Router();

const {
  creatUser,
} = require('../controllers/users');

const { signUpValidation } = require('../middleware/userValidation');

signupRouter.post('/signup', signUpValidation, creatUser);

module.exports = signupRouter;