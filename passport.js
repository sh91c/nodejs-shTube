import passport from 'passport';
import User from './models/User';

passport.use(User.createStrategy()); // strategy 생성(shortcut)

// serialize : 어떤 field가 쿠키에 포함될 것인지 알려주는 역할
// deserialize : 어느 사용자인지 어떻게 찾는가?

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());