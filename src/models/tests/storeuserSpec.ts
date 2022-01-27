import { StoreUserStore } from "../storeuser";

const store = new StoreUserStore();

describe('StoreUser Model', () => {
  it('create method should create a user', async () => {
    const result = await store.create({
      username: 'testUser',
      password: 'pa$$w0rD',
      email: 'test@test.com'
    });
    expect(result.username).toEqual('testUser');
  });
});