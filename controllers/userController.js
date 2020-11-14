import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle : 'Join' });
};
export const postJoin = async (req, res, next) => {
  console.log(req.body);
  const { body : { name, email, password, password2 }} = req;
  if ( password !== password2 ) {
    res.status(400);
    res.render('join', { pageTitle : 'Join' });
  } else {
    try {
      // 회원가입
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render('login', { pageTitle : 'Log In' });
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate('github');
// Callback Github join, login
export const githubLoginCallback = async (accesToken, refreshToken, profile, cb) => {
  // console.log(accesToken, refreshToken, profile, cb);
  const { _json : { id, avatar_url : avatarUrl, name, email } } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) { // 깃허브로 가입한 경우, 깃허브의 이메일과 기존 유저의 이메일 중 같은 것이 있다면 동일 유저라고 생각함
      user.githubId = id;
      user.save();
      return cb(null, user); // github의 callback이 user를 돌려줌
    }
    const newUser = await User.create({
      email, name, avatarUrl, githubId : id
    });
    return cb(null, newUser); // github 콜백이 새로운 유저를 돌려줌(shTube로)
  } catch (error) {
    return cb(error);
  }
};
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// 구현 실패(페이스북에서 localtunnel 사용 불가)
// export const facebookLogin = passport.authenticate('facebook');
// export const facebookLoginCallback = (accesToken, refreshToken, profile, cb) => {
//   console.log(accesToken, refreshToken, profile, cb);
// };
// export const postFacebookLogin = (req, res) => {
//   res.redirect(routes.home);
// };

export const logout = (req, res) => {
  // 로그아웃 처리
  req.logout();
  res.redirect(routes.home);
};

export const users = (req, res) => res.render('users', { pageTitle : 'Users' });

export const getMe = (req, res) => {
  res.render('userDetail', { pageTitle : 'User Detail', user: req.user });
};

export const userDetail = async (req, res) => {
  const { params : { id } } = req;
  try {
    const user = await User.findById(id).populate('videos');
    res.render('userDetail', { pageTitle : 'User Detail', user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => res.render('editProfile', { pageTitle : 'Edit Profile' });
export const postEditProfile = async (req, res) => {
  const {
    body : { name, email},
    file
  } = req;
  try {
    await User.findByIdAndUpdate( req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) => res.render('changePassword', { pageTitle : 'Change Password' });
export const postChangePassword = async (req, res) => {
  const {
    body : { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1){
      res.status(400);
      res.redirect(routes.changePassword);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};