import { test, expect } from '../../../src/api/fixtures/api.fixture';
import Ajv from 'ajv';
import schema from '../../../src/api/schemas/post.schema.json';

const ajv = new Ajv();

test.describe('GET /posts', () => {

  test('Get all posts', async ({ posts }) => {
    const response = await posts.getAll();
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(Array.isArray(json)).toBeTruthy();
  });

  test('Get post by ID', async ({ posts }) => {
    const response = await posts.getById(1);
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(ajv.validate(schema, json)).toBeTruthy();
  });

  test('Get post with invalid ID returns 404', async ({ posts }) => {
    const response = await posts.getById(9999);
    expect(response.status()).toBe(404);
  });

  test('Response headers contain content-type application/json', async ({ posts }) => {
    const response = await posts.getAll();
    expect(response.headers()['content-type']).toContain('application/json');
  });

});
