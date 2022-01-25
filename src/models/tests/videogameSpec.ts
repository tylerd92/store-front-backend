import { VideoGame, VideoGameStore } from "../videogame";

const store = new VideoGameStore();

describe('VideoGame Model', () => {
  it('create method should create a video game', async () => {
    const result = await store.create({
      title: 'Dark Souls',
      genre: 'RPG',
      price: 60,
      summary: 'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all.'
    });
    expect(result).toEqual({
      id: 1,
      title: 'Dark Souls',
      genre: 'RPG',
      price: '60',
      summary: 'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all.'
    });
  });

  it('index method should get all records', async () => {
    const result = await store.index();
    expect(result.length).toBe(1);
  });

  it('show should return the correct video game', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      title: 'Dark Souls',
      genre: 'RPG',
      price: '60',
      summary: 'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all.'
    });
  });

  // it('delete method should remove video game', async () => {
  //   store.delete('1');
  //   const result = await store.index();

  //   expect(result.length).toBe(0);
  // });
});