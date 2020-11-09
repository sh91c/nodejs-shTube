import routes from './routes';

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'shTube'; // pug에서 js 변수 할당이 가능해짐 
  res.locals.routes = routes;     // a(href=routes.join) 같이..
  next();
};