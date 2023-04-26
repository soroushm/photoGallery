import {rest} from 'msw';

export const mockComment = {
  postId: 1,
  id: 1,
  name: 'masoud soroush',
  email: 'masoud@example.com',
  body: 'cute',
};
export const mockComments = [mockComment];
export const comments = rest.get(`*/comments`, async (req, res, ctx) =>
  res(ctx.delay(20), ctx.json(mockComments)),
);
