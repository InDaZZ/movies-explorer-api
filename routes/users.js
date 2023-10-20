const userRouter = require('express').Router();

const { getUserMe, updateUser } = require('../controllers/users');

const { updateUserValidation } = require('../middleware/userValidation');

userRouter.get('/users/me', getUserMe);
userRouter.patch('/users/me', updateUserValidation, updateUser);

module.exports = userRouter;