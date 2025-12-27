import { test, expect } from '../../../src/api/fixtures/api.fixture';
import Ajv from 'ajv';
import schema from '../../../src/api/schemas/user.schema.json';

const ajv = new Ajv();

test.describe('POST /users', () => {

  test('Create a new user', async ({ users }) => {
    const response = await users.create({ name: 'John Doe', username: 'jdoe', email: 'john@example.com' });
    expect(response.status()).toBe(201);
  });

  test('Create user missing email', async ({ users }) => {
    const response = await users.create({ name: 'Jane Doe', username: 'jane' });
    expect(response.status()).toBe(201);
  });

  test('Create user with long name', async ({ users }) => {
    const longName = 'x'.repeat(100);
    const response = await users.create({ name: longName, username: 'longuser', email: 'long@example.com' });
    expect(response.status()).toBe(201);
  });

  test('Create user with special characters in username', async ({ users }) => {
    const response = await users.create({ name: 'Spec Char', username: 'user!@#', email: 'spec@example.com' });
    expect(response.status()).toBe(201);
  });

});
