import express from 'express';
import { changePassword, editProfile, userDetail, users } from '../controllers/userController';
import { onlyPrivate } from '../middlewares';
import routes from '../routes';

const userRouter = express.Router();

userRouter.get('/', users);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);

// '/user/:id'
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;