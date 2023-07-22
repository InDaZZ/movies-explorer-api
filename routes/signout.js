const signoutRouter = require('express').Router();

const {
  logout,
} = require('../controllers/users');

signoutRouter.post('/signout', logout);

module.exports = signoutRouter;