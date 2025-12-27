import { test, expect } from '../../../src/api/fixtures/api.fixture';
import { Helpers } from '../../../src/api/utils/helpers';
import { Logger } from '../../../src/api/utils/logger';

test.describe('PATCH /comments', () => {

  test('Patch name of a comment', async ({ comments }) => {
    const payload = { name: 'Patched Name' };
    Logger.apiRequest('PATCH', '/comments/1', payload);
    const response = await comments.patch(1, payload);
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(200);
  });

  test('Patch body of a comment', async ({ comments }) => {
    const payload = { body: 'Patched body content' };
    const response = await comments.patch(2, payload);
    expect(response.status()).toBe(200);
  });

  test('Patch multiple fields', async ({ comments }) => {
    const payload = { name: 'Multi', body: Helpers.generateRandomString(20) };
    const response = await comments.patch(3, payload);
    expect(response.status()).toBe(200);
  });

  test('Patch email field', async ({ comments }) => {
    const payload = { email: Helpers.generateEmail() };
    const response = await comments.patch(4, payload);
    expect(response.status()).toBe(200);
  });

});
