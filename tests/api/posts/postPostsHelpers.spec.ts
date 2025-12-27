import { test, expect } from '../../../src/api/fixtures/api.fixture';
import Ajv from 'ajv';
import schema from '../../../src/api/schemas/post.schema.json';
import { Helpers } from '../../../src/api/utils/helpers';
import { Logger } from '../../../src/api/utils/logger';

const ajv = new Ajv();

test.describe('POST /posts with Helpers & Logger', () => {

  test('Create post with random title and body', async ({ posts }) => {
    const payload = {
      title: Helpers.generateRandomString(10),
      body: Helpers.generateRandomString(50),
      userId: 1
    };

    Logger.apiRequest('POST', '/posts', payload);
    const response = await posts.create(payload);
    Logger.apiResponse(response.status(), await response.json());

    expect(response.status()).toBe(201);
    const json = await response.json();
    expect(ajv.validate(schema, json)).toBeTruthy();
  });

  test('Create post with email in body using Helper', async ({ posts }) => {
    const payload = {
      title: 'Email Test',
      body: `Contact: ${Helpers.generateEmail()}`,
      userId: 1
    };

    Logger.apiRequest('POST', '/posts', payload);
    const response = await posts.create(payload);
    Logger.apiResponse(response.status(), await response.json());

    expect(response.status()).toBe(201);
  });

  test('Create multiple posts in loop using Helper', async ({ posts }) => {
    for (let i = 0; i < 3; i++) {
      const payload = {
        title: `Loop ${i} - ${Helpers.generateRandomString(5)}`,
        body: `Body ${i} - ${Helpers.generateRandomString(20)}`,
        userId: 1
      };
      Logger.apiRequest('POST', '/posts', payload);
      const response = await posts.create(payload);
      Logger.apiResponse(response.status(), await response.json());
      expect(response.status()).toBe(201);
    }
  });

  test('Create post and wait using Helper.wait', async ({ posts }) => {
    const payload = {
      title: 'Wait Test',
      body: 'Testing wait helper',
      userId: 1
    };
    Logger.apiRequest('POST', '/posts', payload);

    await Helpers.wait(500); // wait 0.5s
    const response = await posts.create(payload);
    Logger.apiResponse(response.status(), await response.json());
    expect(response.status()).toBe(201);
  });

});
