import {rest} from 'msw';
import {faker} from '@faker-js/faker';
import {LIMIT} from '../config';
const url = 'https://via.placeholder.com';
export const generateRandomPhotoURL = size => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${url}/${size}/${randomString}`;
};

export const generateMockAlbum = () => ({
  albumId: faker.datatype.uuid(),
  id: faker.datatype.uuid(),
  title: faker.lorem.words(5),
  url: generateRandomPhotoURL(600),
  thumbnailUrl: generateRandomPhotoURL(150),
});

export const generateMockAlbums = count => {
  if (typeof count !== 'number' || count < 0) {
    throw new Error(`Invalid count: ${count}`);
  }
  return new Array(count).fill(undefined).map(generateMockAlbum);
};

export const albumsHandler = rest.get(`*/api/albums`, async (req, res, ctx) => {
  const limit = Number(req.url.searchParams.get('limit') || LIMIT);
  return res(ctx.delay(20), ctx.json(generateMockAlbums(limit)));
});
