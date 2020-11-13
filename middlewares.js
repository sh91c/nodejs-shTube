import multer from 'multer';
import routes from './routes';

const multerVideo = multer({ dest: 'uploads/videos/'});

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'shTube'; // pug에서 js 변수 할당이 가능해짐 
  res.locals.routes = routes;     // a(href=routes.join) 같이..
  res.locals.user = req.user || null;
  // res.locals.user = {
  //   isAuthenticated : false,
  //   id : 1,
  // };
  // console.log(req.user);
  res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org"); // helmet 보안때문에 헤더 내용 추가
  next();
};

// 로그인을 했으면 join과 같은 페이지 라우터를 접속하지 못하도록 미들웨어 작성
export const onlyPublic = (req, res, next) => {
  if (req.user){
    res.redirect(routes.home);
  } else {
    next();
  }
};
// 반대로 로그인을 해야지만 접속 가능한 라우터로 넘어갈 수 있도록 미들웨어 작성
export const onlyPrivate = (req, res, next) => {
  if (req.user){
    next();
  } else {
    res.redirect(routes.home);
  }
}

export const uploadVideo = multerVideo.single('videoFile');
  // single : 업로드 개수 1개, videoFile : upload.pug의 input file의 name 속성