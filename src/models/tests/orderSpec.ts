import { OrderStore } from "../order";
import { StoreUserStore } from "../storeuser";

const store = new OrderStore();
const userStore = new StoreUserStore();

describe('Order Model', () => {
  beforeAll(async () => {
    const userResult = await userStore.create({
      username: 'testUser1',
      password: 'pa$$w0rD123',
      email: 'test1@test.com'
    });
    // const result = await store.create({
    //   orderStatus: 'initiated',
    //   userId: 1 
    // });
  });
  describe('create part', () => {
    it('create method should create a order', async () => {
      const result = await store.create({
        orderStatus: 'initiated',
        userId: 1 
      });
      expect(result.id).toEqual(1);
    });
  })
});