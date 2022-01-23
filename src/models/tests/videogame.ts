import { VideoGame, VideoGameStore } from "../videogame";

const store = new VideoGameStore();

describe('VideoGame Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
});