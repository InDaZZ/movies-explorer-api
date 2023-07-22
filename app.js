const express = require('express');

const mongoose = require('mongoose');

const PORT = process.env;

require('dotenv').config();

const cors = require('cors');

const cookieParser = require('cookie-parser');

const router = require('./routes/index');

const errHandler = require('./middleware/err');

const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(cors({
  origin: [
    'https://http://localhost:3000',
    'http://http://localhost:3000',
    'https://http://localhost:3001',
    'http://http://localhost:3001',
    'https://http://localhost:5000',
    'http://http://localhost:5000',
    'https://api.movies-project.nomoredomains.xyz',
    'http://api.movies-project.nomoredomains.xyz'],
  credentials: true,
}));

app.use('/', router);

app.use(errorLogger);

app.use(errHandler);

mongoose.connect('mongodb://0.0.0.0:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);