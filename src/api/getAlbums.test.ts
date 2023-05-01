import {getAlbums} from './getAlbums';

describe('getAlbums', () => {
  test('should return a list of albums', async () => {
    const data = await getAlbums({pageParam: 1, limit: 1});
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('albumId');
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('url');
    expect(data[0]).toHaveProperty('thumbnailUrl');
  });

  test('should return the specified number of albums', async () => {
    const data = await getAlbums({pageParam: 1, limit: 3});
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(3);
  });
});
