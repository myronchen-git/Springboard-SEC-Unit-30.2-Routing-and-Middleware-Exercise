'use strict';

const express = require('express');
const morgan = require('morgan');

const ExpressShoppingListError = require('./errors/expressShoppingListError');

// ==================================================

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// handle unrecognized routes
app.get((req, res, next) => {
  return next(new ExpressShoppingListError('Not found.', 404));
});

// global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({
    error: {
      message: err.message,
      status,
    },
  });
});

// ==================================================

module.exports = app;
