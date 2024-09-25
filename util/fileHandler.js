'use strict';

const fs = require('fs');

const ExpressShoppingListError = require('../errors/expressShoppingListError');

// ==================================================

class FileHandler {
  constructor(path) {
    this.path = path;
  }

  /**
   * Reads the file at the provided path and returns the parsed data.
   *
   * @returns Parsed data from file.
   * @throws {ExpressShoppingListError} If there is an issue reading the file.
   */
  read() {
    let data;
    try {
      data = fs.readFileSync(this.path, 'utf8');
    } catch (err) {
      throw new ExpressShoppingListError('Issue reading file.', 500);
    }

    return JSON.parse(data);
  }

  /**
   * Writes data to a provided file.  Overwrites existing file.
   *
   * @param {Array} data Any JSON-compatible data to save.
   * @throws {ExpressShoppingListError} If there is an issue writing to the
   *  file.
   */
  write(data) {
    const jsonString = JSON.stringify(data);

    try {
      fs.writeFileSync(this.path, jsonString);
    } catch (err) {
      throw new ExpressShoppingListError('Issue writing file.', 500);
    }
  }
}

// ==================================================

module.exports = FileHandler;
