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

// ==================================================

module.exports = router;
