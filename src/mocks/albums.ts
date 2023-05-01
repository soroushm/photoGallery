import {rest} from 'msw';
import {faker} from '@faker-js/faker';
import {LIMIT} from '../config';

const BASE_URL_PHOTO = 'https://via.placeholder.com';

export const createRandomPhotoURL = size => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${BASE_URL_PHOTO}/${size}/${randomString}`;
};

export const createMockAlbum = () => ({
  albumId: faker.datatype.uuid(),
  id: faker.datatype.uuid(),
  title: faker.lorem.words(5),
  url: createRandomPhotoURL(600),
  thumbnailUrl: createRandomPhotoURL(150),
});

export const createMockAlbums = count => {
  if (typeof count !== 'number' || count < 0) {
    throw new Error(`Invalid count: ${count}`);
  }
  return new Array(count).fill(undefined).map(createMockAlbum);
};

/**
 * A handler for serving comment API requests.
 */
export const albumsHandler = [
  rest.get(`*/api/albums`, async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit') || LIMIT);
    return res(ctx.delay(20), ctx.json(createMockAlbums(limit)));
  }),
];
