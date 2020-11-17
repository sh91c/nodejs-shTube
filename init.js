import dotenv from 'dotenv';
import './db';
import './models/Video';
import './models/Comment';
import './models/User';

import app from './app';

dotenv.config();

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => console.log(`✅ Listening on: http://localhost:${app.get('port')}`));