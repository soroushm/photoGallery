import {Comments} from '../type';
import request from './request';

interface Param {
  pageParam?: number;
  limit?: number;
  albumId?: string;
}
export const getComments = async ({
  pageParam = 0,
  limit = 3,
  albumId,
}: Param): Promise<Comments> => {
  const {data} = await request.get('api/album/comments', {
    params: {
      albumId,
      page: pageParam,
      limit,
    },
  });
  return data;
};
