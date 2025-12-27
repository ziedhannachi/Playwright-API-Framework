import { test, expect } from '../../../src/api/fixtures/api.fixture';
import Ajv from 'ajv';
import schema from '../../../src/api/schemas/comment.schema.json';
import { Helpers } from '../../../src/api/utils/helpers';
import { Logger } from '../../../src/api/utils/logger';

const ajv = new Ajv();

test.describe('POST /comments', () => {

  test('Create comment with random name and body', async ({ comments }) => {
    const payload = {
      postId: 1,
      name: Helpers.generateRandomString(10),
      email: Helpers.generateEmail(),
      body: Helpers.generateRandomString(50)
    };
    Logger.apiRequest('POST', '/comments', payload);
    const response = await comments.create(payload);
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(201);
    expect(ajv.validate(schema, await response.json())).toBeTruthy();
  });

  test('Create comment with empty body', async ({ comments }) => {
    const payload = { postId: 1, name: 'Test', email: 'test@example.com', body: '' };
    const response = await comments.create(payload);
    expect(response.status()).toBe(201);
  });

  test('Create comment with special characters', async ({ comments }) => {
    const payload = { postId: 1, name: '!@#$', email: Helpers.generateEmail(), body: 'Special chars body' };
    const response = await comments.create(payload);
    expect(response.status()).toBe(201);
  });

  test('Create comment and wait', async ({ comments }) => {
    const payload = { postId: 1, name: 'Wait Test', email: Helpers.generateEmail(), body: 'Test wait' };
    await Helpers.wait(500);
    const response = await comments.create(payload);
    expect(response.status()).toBe(201);
  });

});
