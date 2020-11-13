import dotenv from 'dotenv';
import app from './app';
import './db';
import './models/Video';
import './models/Comment';
import './models/User';

dotenv.config();

app.set('port', process.env.PORT || 9090);

// // 404 처리
// app.use((req, res, next)=> {
//   const error = new Error(`${req.method} ${req.url} Not found.`);
//   error.status = 404;
//   next(error);
// });
// // error 처리
// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//   res.render('error');
// });

app.listen(app.get('port'), () => console.log(`✅ Listening on: http://localhost:${app.get('port')}`));