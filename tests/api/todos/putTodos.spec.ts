import { test, expect } from '../../../src/api/fixtures/api.fixture';
import Ajv from 'ajv';
import schema from '../../../src/api/schemas/todo.schema.json';
import { Helpers } from '../../../src/api/utils/helpers';
import { Logger } from '../../../src/api/utils/logger';

const ajv = new Ajv();

test.describe('PUT /todos', () => {

  test('Update a todo completely', async ({ todos }) => {
    const payload = {
      userId: 1,
      title: 'Updated Todo',
      completed: true
    };
    Logger.apiRequest('PUT', '/todos/1', payload);
    const response = await todos.update(1, payload);
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(200);
    expect(ajv.validate(schema, await response.json())).toBeTruthy();
  });

  test('Update todo with random title', async ({ todos }) => {
    const payload = {
      userId: 1,
      title: Helpers.generateRandomString(20),
      completed: false
    };
    const response = await todos.update(2, payload);
    expect(response.status()).toBe(200);
  });

  test('Update todo and set completed false', async ({ todos }) => {
    const payload = { userId: 1, title: 'Incomplete Todo', completed: false };
    const response = await todos.update(3, payload);
    expect(response.status()).toBe(200);
  });

  test('Update todo with long title', async ({ todos }) => {
    const payload = { userId: 1, title: Helpers.generateRandomString(100), completed: true };
    const response = await todos.update(4, payload);
    expect(response.status()).toBe(200);
  });

});
