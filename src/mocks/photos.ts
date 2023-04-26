import {rest} from 'msw';

export const mockPhoto = [
  {
    albumId: 1,
    id: 21,
    title: 'ad et natus qui',
    url: 'https://via.placeholder.com/600/5e12c6',
    thumbnailUrl: 'https://via.placeholder.com/150/5e12c6',
  },
];
export const mockPhotos = [mockPhoto];
export const photos = rest.get(`*/photos`, async (req, res, ctx) =>
  res(ctx.delay(20), ctx.json(mockPhotos)),
);
