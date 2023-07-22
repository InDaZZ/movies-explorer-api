const userRouter = require('express').Router();

const { getUserMe, updateUser } = require('../controllers/users');

const { getUserValidation, updateUserValidation } = require('../middleware/userValidation');

userRouter.get('/users/me', getUserValidation, getUserMe);
userRouter.patch('/users/me', updateUserValidation, updateUser);

module.exports = userRouter;