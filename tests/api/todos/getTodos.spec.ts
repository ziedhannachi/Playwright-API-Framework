import { test, expect } from '../../../src/api/fixtures/api.fixture';
import Ajv from 'ajv';
import schema from '../../../src/api/schemas/todo.schema.json';
import { Logger } from '../../../src/api/utils/logger';

const ajv = new Ajv();

test.describe('GET /todos', () => {

  test('Get all todos', async ({ todos }) => {
    const response = await todos.getAll();
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBeTruthy();
  });

  test('Get todo by random ID', async ({ todos }) => {
    const responseAll = await todos.getAll();
    const allTodos = await responseAll.json();
    const randomId = allTodos[Math.floor(Math.random() * allTodos.length)].id;

    const response = await todos.getById(randomId);
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(200);
    expect(ajv.validate(schema, await response.json())).toBeTruthy();
  });

  test('Get todo with invalid ID returns 404', async ({ todos }) => {
    const response = await todos.getById(99999);
    Logger.warn(`Invalid todo ID, status: ${response.status()}`);
    expect(response.status()).toBe(404);
  });

  test('Check content-type header', async ({ todos }) => {
    const response = await todos.getAll();
    expect(response.headers()['content-type']).toContain('application/json');
  });

});
