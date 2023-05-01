import {drop} from '@mswjs/data';
import {
  createMockAlbumComments,
  generateMockAlbumComments,
  getComments,
  getTotalComments,
  db,
} from './comments';

describe('create fake Comments', () => {
  afterEach(() => {
    drop(db);
  });
  it('should create a mock comment with the provided albumId', async () => {
    const albumId = 'testAlbumId';

    const comment = createMockAlbumComments(albumId);
    expect(comment).toHaveProperty('albumId', albumId);
    expect(comment).toHaveProperty('id');
    expect(comment).toHaveProperty('userId');
    expect(comment).toHaveProperty('body');
    expect(comment).toHaveProperty('name');
    expect(comment).toHaveProperty('date');
  });

  it('should generate the specified number of mock comments for the provided albumId', async () => {
    const albumId = 'testAlbumId';
    const count = 5;
    const comments = generateMockAlbumComments(albumId, count);
    expect(comments.length).toBe(count);
    comments.forEach(comment => {
      expect(comment.albumId).toBe(albumId);
    });
  });

  it('should get the specified number of comments for the provided albumId and page', async () => {
    const albumId = 'testAlbumId';
    const count = 5;
    generateMockAlbumComments(albumId, count);

    const limit = 2;
    const page = 1;
    const comments = await getComments(limit, page, albumId);

    expect(comments.length).toBe(limit);
    comments.forEach(comment => {
      expect(comment.albumId).toBe(albumId);
    });
  });
});

describe('comments db', () => {
  it('should get the total number of comments for the provided albumId', async () => {
    const albumId = 'testAlbumId';
    const count = 5;
    generateMockAlbumComments(albumId, count);

    const totalCount = getTotalComments(albumId);

    expect(totalCount).toBe(count);
  });
});
