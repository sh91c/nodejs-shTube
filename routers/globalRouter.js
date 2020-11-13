import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { getJoin, getLogin, logout, postJoin, postLogin } from '../controllers/userController';
import { onlyPublic } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); // 회원가입 후 자동 로그인

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;