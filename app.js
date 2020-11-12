import express from 'express'; // 바벨 사용시 ES6모듈 import/export 사용가능
  // const express = require('express');
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { localsMiddleware } from './middlewares';

// routers
import routes from './routes';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.set('view engine', 'pug');
// use middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true} ));
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static')); // /static 라우트 요청이 올 때 static 디렉토리 참조

// 템플릿에 변수를 전달하기 위한 미들웨어.. local을 활용해 변수 접근
app.use(localsMiddleware);

// app.use("/", globalRouter);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
  // module.exports = app;