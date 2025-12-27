import { test, expect } from '../../../src/api/fixtures/api.fixture';
import Ajv from 'ajv';
import schema from '../../../src/api/schemas/comment.schema.json';
import { Logger } from '../../../src/api/utils/logger';

const ajv = new Ajv();

test.describe('GET /comments', () => {

  test('Get all comments', async ({ comments }) => {
    const response = await comments.getAll();
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBeTruthy();
  });

  test('Get comment by random ID', async ({ comments }) => {
    const responseAll = await comments.getAll();
    const allComments = await responseAll.json();
    const randomId = allComments[Math.floor(Math.random() * allComments.length)].id;

    const response = await comments.getById(randomId);
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(200);
    expect(ajv.validate(schema, await response.json())).toBeTruthy();
  });

  test('Get comment with invalid ID returns 404', async ({ comments }) => {
    const response = await comments.getById(99999);
    Logger.warn(`Trying to fetch invalid comment ID, status: ${response.status()}`);
    expect(response.status()).toBe(404);
  });

  test('Verify content-type header', async ({ comments }) => {
    const response = await comments.getAll();
    expect(response.headers()['content-type']).toContain('application/json');
  });

});
