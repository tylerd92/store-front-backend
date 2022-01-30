import { StoreUserStore } from "../storeuser";

const store = new StoreUserStore();

describe('StoreUser Model', () => {
  beforeAll( async () => {
    const result = await store.create({
      username: 'testUser2',
      password: 'pa$$w0rD123',
      email: 'test2@test.com'
    });
  })

  it('create method should create a user', async () => {
    const result = await store.create({
      username: 'testUser',
      password: 'pa$$w0rD',
      email: 'test@test.com'
    });
    expect(result.username).toEqual('testUser');
  });

  it('index method should get all records', async () => {
    const result = await store.index();
    expect(result.length).toBe(1);
  });
});