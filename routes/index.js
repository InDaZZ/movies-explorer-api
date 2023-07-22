const router = require('express').Router();

const signinRouter = require('./signin');

const signupRouter = require('./signup');

const userRouter = require('./users');

const filmRoutet = require('./films');

const signoutRouter = require('./signout');

const auth = require('../middleware/auth');

const NotFoundError = require('../error/not-found-err');

router.use('/', signinRouter);
router.use('/', signupRouter);
router.use(auth);
router.use('/', userRouter);
router.use('/', filmRoutet);
router.use('/', signoutRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;