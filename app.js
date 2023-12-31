const express = require('express');

const mongoose = require('mongoose');

require('dotenv').config();

const cors = require('cors');

const cookieParser = require('cookie-parser');

const { PORT, MONGODB } = require('./config');

const router = require('./routes/index');

const errHandler = require('./middleware/err');

const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(cors({
  origin: [
    'http://movies-frontend.nomoredomainsicu.ru',
    'https://movies-frontend.nomoredomainsicu.ru',
    'http://localhost:3001',
    'https://localhost:3001',
    'http://localhost:3000',
    'https://localhost:3000',
    'https://http://localhost:5000',
    'http://http://localhost:5000',
    'https://api.movies-project.nomoredomains.xyz',
    'http://api.movies-project.nomoredomains.xyz'],
  credentials: true,
}));

app.use('/', router);

app.use(errorLogger);

app.use(errHandler);

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);