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

    const result = await store.create({
      orderStatus: 'initiated',
      userId: 1 
    });
    
  });
  describe('create, index, and show part', () => {
    it('create method should create an order', async () => {
      const result = await store.create({
        orderStatus: 'initiated',
        userId: 1 
      });
      expect(result.id).toEqual(2);
    });

    it('index method should get all order records', async() => {
      const result = await store.index();
      expect(result.length).toBeGreaterThan(0);
    });

    it('show method should get order based on id', async () => {
      const result = await store.show('1');

      expect(result.id).toEqual(1);
    });
    it('showByUserId method get all orders based on used ID', async () => {
      const result = await store.showByUserId('1');
      expect(result.length).toBeGreaterThanOrEqual(1);
    })
  });
});