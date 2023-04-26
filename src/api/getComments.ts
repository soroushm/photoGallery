import {Comment} from '../type';
import request from './request';

export type Response = Comment[];

interface Param {
  pageParam?: number;
  limit?: number;
  albumId?: number;
}
export const getComments = async ({
  pageParam = 0,
  limit = 3,
  albumId,
}: Param): Promise<Response> => {
  const {data} = await request.get('/comments', {
    params: {
      postId: albumId,
      _page: pageParam,
      _limit: limit,
    },
  });
  return data;
};
