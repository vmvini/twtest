require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const app = express();
const api = require('./api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', api);
app.use((req, res, next) => {
  res
  .status(404)
  .json({
    ...createError(404),
    success: false,
    message_code: 404
  });
});

module.exports = app;
