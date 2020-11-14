import passport from 'passport';
import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { getJoin, getLogin, githubLogin, logout, postGithubLogin, postJoin, postLogin, getMe, facebookLogin, postFacebookLogin } from '../controllers/userController';
import { onlyPrivate, onlyPublic } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.me, getMe);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); // 회원가입 후 자동 로그인

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.github_callback,
  passport.authenticate('github', { failureRedirect: routes.login }),
  postGithubLogin
);

// 로컬로 https 환경을 구성할 수 없어(localtunnel 사용 불가..) 구현 실패
// globalRouter.get(routes.facebook, facebookLogin);
// globalRouter.get(
//   routes.facebook_callback,
//   passport.authenticate('facebook', { failureRedirect: routes.login }),
//   postFacebookLogin
// );


export default globalRouter;