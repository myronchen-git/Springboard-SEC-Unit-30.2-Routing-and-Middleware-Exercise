'use strict';

const express = require('express');

const items = require('../fakeDb');
const ExpressShoppingListError = require('../errors/expressShoppingListError');

// ==================================================

const router = new express.Router();

// --------------------------------------------------

// GET /items
router.get('', (req, res, next) => {
  return res.json(items);
});

// POST /items
router.post('', (req, res, next) => {
  const item = { name: req.body.name, price: req.body.price };
  items.push(item);
  return res.status(201).json(item);
});

// GET /items/:name
router.get('/:name', (req, res, next) => {
  const item = items.find((item) => item.name === req.params.name);

  if (item === undefined) {
    throw new ExpressShoppingListError('Item can not be found.', 404);
  }

  return res.json(item);
});

// PATCH /items/:name
router.patch('/:name', (req, res, next) => {
  const itemIndex = items.findIndex((item) => item.name === req.params.name);

  if (itemIndex === -1) {
    throw new ExpressShoppingListError('Item can not be found.', 404);
  }

  items[itemIndex].name = req.body.name || items[itemIndex].name;
  items[itemIndex].price = req.body.price || items[itemIndex].price;

  return res.json(items[itemIndex]);
});

// DELETE /items/:name
router.delete('/:name', (req, res, next) => {
  const itemIndex = items.findIndex((item) => item.name === req.params.name);

  if (itemIndex === -1) {
    throw new ExpressShoppingListError('Item can not be found.', 404);
  }

  items.splice(itemIndex, 1);

  return res.json({ message: 'Deleted' });
});

// ==================================================

module.exports = router;
