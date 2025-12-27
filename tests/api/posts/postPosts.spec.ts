import { test, expect } from '../../../src/api/fixtures/api.fixture';
import Ajv from 'ajv';
import schema from '../../../src/api/schemas/post.schema.json';

const ajv = new Ajv();

test.describe('POST /posts', () => {

  test('Create a new post', async ({ posts }) => {
    const response = await posts.create({ title: 'foo', body: 'bar', userId: 1 });
    expect(response.status()).toBe(201);
    const json = await response.json();
    expect(ajv.validate(schema, json)).toBeTruthy();
  });

  test('Create post with missing title', async ({ posts }) => {
    const response = await posts.create({ body: 'bar', userId: 1 });
    expect(response.status()).toBe(201); 
  });

  test('Create post with empty body', async ({ posts }) => {
    const response = await posts.create({ title: 'foo', body: '', userId: 1 });
    expect(response.status()).toBe(201);
  });

  test('Create post with large content', async ({ posts }) => {
    const longBody = 'x'.repeat(1000);
    const response = await posts.create({ title: 'big', body: longBody, userId: 1 });
    expect(response.status()).toBe(201);
  });

});
