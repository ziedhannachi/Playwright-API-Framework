import { test, expect } from '../../../src/api/fixtures/api.fixture';
import { Logger } from '../../../src/api/utils/logger';

test.describe('DELETE /todos', () => {

  test('Delete todo with valid ID', async ({ todos }) => {
    Logger.apiRequest('DELETE', '/todos/1');
    const response = await todos.delete(1);
    Logger.apiResponse(response.status(), {});
    expect(response.status()).toBe(200);
  });

  test('Delete todo with invalid ID', async ({ todos }) => {
    const response = await todos.delete(9999);
    expect(response.status()).toBe(200);
  });

  test('Delete todo twice', async ({ todos }) => {
    await todos.delete(2);
    const response = await todos.delete(2);
    expect(response.status()).toBe(200);
  });

  test('Delete todo and verify fetch returns 404', async ({ todos }) => {
    await todos.delete(3);
    const response = await todos.getById(3);
    expect(response.status()).toBe(404);
  });

});
