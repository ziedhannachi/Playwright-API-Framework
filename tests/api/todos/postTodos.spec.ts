import { test, expect } from '../../../src/api/fixtures/api.fixture';
import Ajv from 'ajv';
import schema from '../../../src/api/schemas/todo.schema.json';
import { Helpers } from '../../../src/api/utils/helpers';
import { Logger } from '../../../src/api/utils/logger';

const ajv = new Ajv();

test.describe('POST /todos', () => {

  test('Create a new todo', async ({ todos }) => {
    const payload = {
      userId: 1,
      title: Helpers.generateRandomString(15),
      completed: false
    };
    Logger.apiRequest('POST', '/todos', payload);
    const response = await todos.create(payload);
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(201);
    expect(ajv.validate(schema, await response.json())).toBeTruthy();
  });

  test('Create multiple todos with loop', async ({ todos }) => {
    for (let i = 0; i < 3; i++) {
      const payload = {
        userId: 1,
        title: `Todo ${i} - ${Helpers.generateRandomString(5)}`,
        completed: i % 2 === 0
      };
      const response = await todos.create(payload);
      expect(response.status()).toBe(201);
    }
  });

  test('Create todo with long title', async ({ todos }) => {
    const payload = {
      userId: 1,
      title: Helpers.generateRandomString(100),
      completed: false
    };
    const response = await todos.create(payload);
    expect(response.status()).toBe(201);
  });

  test('Create todo and wait', async ({ todos }) => {
    const payload = { userId: 1, title: 'Wait Todo', completed: true };
    await Helpers.wait(500);
    const response = await todos.create(payload);
    expect(response.status()).toBe(201);
  });

});
