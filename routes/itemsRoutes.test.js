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

describe('POST /items', () => {
  const url = '/items';

  test('Adds a new item into the shopping list.', async () => {
    // Act
    const resp = await request(app).post(url).send(item1);

    // Assert
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual(item1);
    expect(items).toEqual([item1]);
  });
});

describe('GET /items/:name', () => {
  const url = '/items/popsicle';

  beforeEach(() => {
    items.push(JSON.parse(JSON.stringify(item1)));
  });

  test('Gets a single item.', async () => {
    // Act
    const resp = await request(app).get(url);

    // Assert
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(item1);
  });

  test('Returns 404 if item does not exist.', async () => {
    // Arrange
    const url = '/items/lemon';

    // Act
    const resp = await request(app).get(url);

    // Assert
    expect(resp.statusCode).toBe(404);
  });
});

describe('PATCH /items/:name', () => {
  const url = '/items/popsicle';

  beforeEach(() => {
    items.push(JSON.parse(JSON.stringify(item1)));
  });

  test('Modifies a single item.', async () => {
    // Act
    const resp = await request(app).patch(url).send(item2);

    // Assert
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(item2);
    expect(items).toEqual([item2]);
  });

  test('Partially modifies a single item.', async () => {
    // Arrange
    const requestBody = { price: 10 };
    const expectedItem = { ...item1, ...requestBody };

    // Act
    const resp = await request(app).patch(url).send(requestBody);

    // Assert
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(expectedItem);
    expect(items).toEqual([expectedItem]);
  });

  test('Returns 404 if item does not exist.', async () => {
    // Arrange
    const url = '/items/lemon';

    // Act
    const resp = await request(app).patch(url).send(item2);

    // Assert
    expect(resp.statusCode).toBe(404);
    expect(items).toEqual([item1]);
  });
});
