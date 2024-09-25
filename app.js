'use strict';

const fs = require('fs');

const express = require('express');
const morgan = require('morgan');

const itemsRoutes = require('./routes/itemsRoutes');
const ExpressShoppingListError = require('./errors/expressShoppingListError');
const { STORAGE_FILE } = require('./constants');
const FileHandler = require('./util/fileHandler');

// ==================================================

const fileHandler = new FileHandler(STORAGE_FILE);

// --------------------------------------------------

if (!fs.existsSync(STORAGE_FILE)) {
  fileHandler.write([]);
}

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/items', itemsRoutes);

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
