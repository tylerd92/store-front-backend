import { VideoGame, VideoGameStore } from "../videogame";

const store = new VideoGameStore();

describe('VideoGame Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should create a video game', async () => {
    const result = await store.create({
      title: 'Dark Souls',
      genre: 'RPG',
      price: 60,
      summary: 'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all.'
    });
    console.log(typeof result.price);
    expect(result).toEqual({
      id: 2,
      title: 'Dark Souls',
      genre: 'RPG',
      price: '60',
      summary: 'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all.'
    });
  });
});