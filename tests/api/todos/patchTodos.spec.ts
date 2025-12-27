import { test, expect } from '../../../src/api/fixtures/api.fixture';
import { Helpers } from '../../../src/api/utils/helpers';
import { Logger } from '../../../src/api/utils/logger';

test.describe('PATCH /todos', () => {

  test('Patch title of a todo', async ({ todos }) => {
    const payload = { title: 'Patched Title' };
    Logger.apiRequest('PATCH', '/todos/1', payload);
    const response = await todos.patch(1, payload);
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(200);
  });

  test('Patch completed field', async ({ todos }) => {
    const payload = { completed: true };
    const response = await todos.patch(2, payload);
    expect(response.status()).toBe(200);
  });

  test('Patch title and completed', async ({ todos }) => {
    const payload = { title: Helpers.generateRandomString(15), completed: false };
    const response = await todos.patch(3, payload);
    expect(response.status()).toBe(200);
  });

  test('Patch with random title', async ({ todos }) => {
    const payload = { title: Helpers.generateRandomString(25) };
    const response = await todos.patch(4, payload);
    expect(response.status()).toBe(200);
  });

});
