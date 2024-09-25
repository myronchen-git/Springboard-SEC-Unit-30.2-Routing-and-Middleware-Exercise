'use strict';

const express = require('express');

const FileHandler = require('../util/fileHandler');
const { STORAGE_FILE } = require('../constants');
const ExpressShoppingListError = require('../errors/expressShoppingListError');

// ==================================================

const router = new express.Router();

const fileHandler = new FileHandler(STORAGE_FILE);

// --------------------------------------------------

// GET /items
router.get('', (req, res, next) => {
  const items = fileHandler.read();
  return res.json(items);
});

// POST /items
router.post('', (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    throw new ExpressShoppingListError(
      'Item info is missing name or price.',
      400
    );
  }

  const items = fileHandler.read();

  const item = { name: req.body.name, price: req.body.price };
  items.push(item);

  fileHandler.write(items);

  return res.status(201).json(item);
});

// GET /items/:name
router.get('/:name', (req, res, next) => {
  const items = fileHandler.read();

  const item = items.find((item) => item.name === req.params.name);

  if (item === undefined) {
    throw new ExpressShoppingListError('Item can not be found.', 404);
  }

  return res.json(item);
});

// PATCH /items/:name
router.patch('/:name', (req, res, next) => {
  const items = fileHandler.read();

  const itemIndex = items.findIndex((item) => item.name === req.params.name);

  if (itemIndex === -1) {
    throw new ExpressShoppingListError('Item can not be found.', 404);
  }

  items[itemIndex].name = req.body.name || items[itemIndex].name;
  items[itemIndex].price = req.body.price || items[itemIndex].price;

  fileHandler.write(items);

  return res.json(items[itemIndex]);
});

// DELETE /items/:name
router.delete('/:name', (req, res, next) => {
  const items = fileHandler.read();

  const itemIndex = items.findIndex((item) => item.name === req.params.name);

  if (itemIndex === -1) {
    throw new ExpressShoppingListError('Item can not be found.', 404);
  }

  items.splice(itemIndex, 1);

  fileHandler.write(items);

  return res.json({ message: 'Deleted' });
});

// ==================================================

module.exports = router;
