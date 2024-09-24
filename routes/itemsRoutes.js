'use strict';

const express = require('express');

const items = require('../fakeDb');

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

// ==================================================

module.exports = router;
