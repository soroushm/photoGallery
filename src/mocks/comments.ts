import {factory, primaryKey} from '@mswjs/data';
import {rest} from 'msw';
import {LIMIT} from '../config';
import {faker} from '@faker-js/faker';

export const db = factory({
  comments: {
    id: primaryKey(String),
    albumId: String,
    userId: String,
    name: String,
    email: String,
    body: String,
    date: String,
  },
});

export const createMockAlbumComments = albumId => ({
  id: faker.datatype.uuid(),
  albumId,
  userId: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  body: faker.lorem.words(6),
  date: faker.date.past(),
});

export const generateMockAlbumComments = (albumId, count) => {
  const comments = new Array(count)
    .fill(undefined)
    .map(() => createMockAlbumComments(albumId));

  // insert fake comments to db
  comments.forEach(db.comments.create);
  return comments;
};

export const getComments = (limit: number, page: number, albumId?: string) => {
  const where = !albumId
    ? {}
    : {
        albumId: {
          equals: albumId,
        },
      };
  return db.comments.findMany({
    where,
    take: limit,
    skip: limit * page,
  });
};

export const getTotalComments = (albumId?: string) => {
  const where = !albumId
    ? {}
    : {
        albumId: {
          equals: albumId,
        },
      };

  return db.comments.count({where});
};

/**
 * A handler for serving comment API requests.
 */
export const commentsHandler = [
  ...db.comments.toHandlers('rest', '*/api'), // rest-full api for comment
  rest.get(`*/api/album/comments`, async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit') || LIMIT);
    const page = Number(req.url.searchParams.get('page') || 1);
    const albumId = req.url.searchParams.get('albumId') ?? undefined;
    const totalCount = getTotalComments(albumId);
    const comments =
      totalCount || !albumId
        ? getComments(limit, page, albumId)
        : generateMockAlbumComments(albumId, limit);

    return res(ctx.delay(20), ctx.json(comments));
  }),
];
