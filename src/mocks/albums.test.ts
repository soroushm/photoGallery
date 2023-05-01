import {createMockAlbums} from './albums';

describe('generateMockAlbums', () => {
  test('should generate the specified number of albums', () => {
    const albums = createMockAlbums(3);
    expect(albums.length).toBe(3);
  });

  test('should throw an error when the count is negative', () => {
    expect(() => createMockAlbums(-1)).toThrow(/Invalid count/);
  });

  test('should throw an error when the count is not a number', () => {
    expect(() => createMockAlbums('invalid')).toThrow(/Invalid count/);
  });
});
