import { test, expect } from '../../../src/api/fixtures/api.fixture';
import { Logger } from '../../../src/api/utils/logger';

test.describe('DELETE /comments', () => {

  test('Delete comment with valid ID', async ({ comments }) => {
    Logger.apiRequest('DELETE', '/comments/1');
    const response = await comments.delete(1);
    Logger.apiResponse(response.status(), {});
    expect(response.status()).toBe(200);
  });

  test('Delete comment with invalid ID', async ({ comments }) => {
    const response = await comments.delete(9999);
    expect(response.status()).toBe(200);
  });

  test('Delete comment twice', async ({ comments }) => {
    await comments.delete(2);
    const response = await comments.delete(2);
    expect(response.status()).toBe(200);
  });

  test('Delete comment and verify fetch returns 404', async ({ comments }) => {
    await comments.delete(3);
    const response = await comments.getById(3);
    expect(response.status()).toBe(404);
  });

});
