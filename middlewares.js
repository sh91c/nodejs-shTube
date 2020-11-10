import routes from './routes';

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'shTube'; // pug에서 js 변수 할당이 가능해짐 
  res.locals.routes = routes;     // a(href=routes.join) 같이..
  res.locals.user = {
    isAuthenticated : true,
    id : 1, 
  };
  res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org"); // helmet 보안때문에 헤더 내용 추가
  next();
};