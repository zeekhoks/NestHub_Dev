const express = require('express');
const userController = require('../controllers/user_controller');
const userRouter = express.Router();

userRouter.get('/verify', userController.verificationHandler);
userRouter.get('/:id', userController.getUserById);
userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUserEntry);
userRouter.delete('/:id', userController.deleteUserEntry);
userRouter.post('/login', userController.userLogin);
module.exports = {
    userRouter: userRouter
}