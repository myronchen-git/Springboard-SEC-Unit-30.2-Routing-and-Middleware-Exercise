'use strict';

process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
const items = require('../fakeDb');

// ==================================================

const item1 = Object.freeze({ name: 'popsicle', price: 1.45 });
const item2 = Object.freeze({ name: 'cheerios', price: 3.4 });

afterEach(() => {
  items.length = 0;
});

describe('GET /items', () => {
  const url = '/items';

  beforeEach(() => {
    items.push(
      JSON.parse(JSON.stringify(item1)),
      JSON.parse(JSON.stringify(item2))
    );
  });

  test('Gets a list of shopping items.', async () => {
    // Act
    const resp = await request(app).get(url);

    // Assert
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([item1, item2]);
  });
});
