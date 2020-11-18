import express from 'express';
import { getChangePassword, getEditProfile, postChangePassword, postEditProfile, userDetail, users } from '../controllers/userController';
import { onlyPrivate, uploadAvatar } from '../middlewares';
import routes from '../routes';

const userRouter = express.Router();

userRouter.get('/', users);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

// '/user/:id'
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;