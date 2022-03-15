import { OrderVideoGameStore } from '../ordervideogame';
import { OrderStore } from '../order';
import { StoreUserStore } from "../storeuser";

const store = new OrderVideoGameStore();
const orderStore = new OrderStore();
const userStore = new StoreUserStore();

describe('OrderVideoGame Model', () => {
  beforeAll(async () => {
    // const userResult = await userStore.create({
    //   username: 'testUser3',
    //   password: 'pa$$w0rD123',
    //   email: 'test1@test.com'
    // });

    const orderResult = await orderStore.create({
      orderStatus: 'initiated',
      userId: 2
    });

    const result = await store.create({
      quantity: 1,
      orderId: 1,
      gameId: 1
    })
  });

  it ('create method should insert a new record', async () => {
    const result = await store.create({
      quantity: 1,
      orderId: 3,
      gameId: 2
    });
    expect(result.id).toEqual(2);
  });

  it('show method should get a record', async () => {
    const result = await store.show('1');
    expect(result.id).toEqual(1);
  })

  it('index method should get all records', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });
})