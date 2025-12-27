import { test, expect } from '../../../src/api/fixtures/api.fixture';
import Ajv from 'ajv';
import schema from '../../../src/api/schemas/comment.schema.json';
import { Helpers } from '../../../src/api/utils/helpers';
import { Logger } from '../../../src/api/utils/logger';

const ajv = new Ajv();

test.describe('PUT /comments', () => {

  test('Update comment completely', async ({ comments }) => {
    const payload = {
      postId: 1,
      name: 'Updated Name',
      email: Helpers.generateEmail(),
      body: 'Updated body content'
    };
    Logger.apiRequest('PUT', '/comments/1', payload);
    const response = await comments.update(1, payload);
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(200);
    expect(ajv.validate(schema, await response.json())).toBeTruthy();
  });

  test('Update comment with random content', async ({ comments }) => {
    const payload = {
      postId: 1,
      name: Helpers.generateRandomString(10),
      email: Helpers.generateEmail(),
      body: Helpers.generateRandomString(50)
    };
    const response = await comments.update(2, payload);
    expect(response.status()).toBe(200);
  });

  test('Update comment with empty body', async ({ comments }) => {
    const payload = { postId: 1, name: 'Empty Body', email: Helpers.generateEmail(), body: '' };
    const response = await comments.update(3, payload);
    expect(response.status()).toBe(200);
  });

  test('Update comment with special characters', async ({ comments }) => {
    const payload = { postId: 1, name: '!@#$', email: Helpers.generateEmail(), body: 'Special chars' };
    const response = await comments.update(4, payload);
    expect(response.status()).toBe(200);
  });

});
