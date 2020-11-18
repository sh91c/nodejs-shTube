import '@babel/polyfill';
import dotenv from 'dotenv';
import './db';
import './models/Video';
import './models/Comment';
import './models/User';

import app from './app';

dotenv.config();

app.set('port', process.env.PORT || 9090);

app.listen(app.get('port'), () => console.log(`✅ Listening on: http://localhost:${app.get('port')}`));