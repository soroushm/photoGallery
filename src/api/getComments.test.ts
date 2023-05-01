import {getComments} from './getComments';

describe('getComments', () => {
  test('should return a list of comments', async () => {
    const data = await getComments({pageParam: 0, limit: 1, albumId: '1'});
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('albumId');
    expect(data[0]).toHaveProperty('userId');
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('body');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('date');
  });

  test('should return the specified number of comments', async () => {
    const data = await getComments({pageParam: 0, limit: 3, albumId: '2'});
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(3);
  });
});
