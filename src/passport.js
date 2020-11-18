import passport from 'passport';
import GithubStrategy from 'passport-github';
// import FacebookStrategy from 'passport-facebook';
import { facebookLoginCallback, githubLoginCallback } from './controllers/userController';
import User from './models/User';
import routes from './routes';

passport.use(User.createStrategy()); // strategy 생성(shortcut)
passport.use(
  new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    // callbackURL: `http://localhost:9090${routes.github_callback}`,
    callbackURL: process.env.PRODUCTION
      ? `https://boiling-plains-40691.herokuapp.com${routes.github_callback}`
      : `http://localhost:9090${routes.github_callback}`,
  }, githubLoginCallback)
);

// passport.use(
//   new FacebookStrategy({
//     clientID: process.env.FB_ID,
//     clientSecret: process.env.FB_SECRET,
//     callbackURL: `https://breezy-eel-91.loca.lt${routes.facebook_callback}`,
//   }, facebookLoginCallback)
// );

// serialize : 어떤 field가 쿠키에 포함될 것인지 알려주는 역할
// deserialize : 어느 사용자인지 어떻게 찾는가?

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());