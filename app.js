import express from "express"; // 바벨 사용시 ES6모듈 import/export 사용가능
  // const express = require('express');
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import pug from 'pug';

// routers
import routes from './routes';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const app = express();

app.set('view engine', 'pug');
// use middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true} ));
app.use(helmet());
app.use(morgan("dev"));

// app.use("/", globalRouter);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
  // module.exports = app;