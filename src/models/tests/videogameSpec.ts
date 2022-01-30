import { VideoGame, VideoGameStore } from "../videogame";

const store = new VideoGameStore();

describe('VideoGame Model', () => {

  beforeAll( async () => {
    const result = await store.create({
      title: 'Test',
      genre: 'Action',
      price: 15,
      summary: 'This is a test.'
    });
  })

  it('create method should create a video game', async () => {
    const result = await store.create({
      title: 'Dark Souls',
      genre: 'RPG',
      price: 60,
      summary: 'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all.'
    });
    expect(result).toEqual({
      id: 2,
      title: 'Dark Souls',
      genre: 'RPG',
      price: '60',
      summary: 'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all.'
    });
  });

  it('index method should get all records', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('show should return the correct video game', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      title: 'Test',
      genre: 'Action',
      price: '15',
      summary: 'This is a test.'
    });
  });
});