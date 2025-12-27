import { test, expect } from '../../../src/api/fixtures/api.fixture';

test.describe('PATCH /posts', () => {

  test('Patch title of a post', async ({ posts }) => {
    const response = await posts.patch(1, { title: 'patched title' });
    expect(response.status()).toBe(200);
  });

  test('Patch body of a post', async ({ posts }) => {
    const response = await posts.patch(1, { body: 'patched body' });
    expect(response.status()).toBe(200);
  });

  test('Patch userId of a post', async ({ posts }) => {
    const response = await posts.patch(1, { userId: 99 });
    expect(response.status()).toBe(200);
  });

  test('Patch multiple fields', async ({ posts }) => {
    const response = await posts.patch(1, { title: 'multi', body: 'multi body' });
    expect(response.status()).toBe(200);
  });

});
