import {Albums} from '../type';
import request from './request';
import {LIMIT} from '../config';

interface Param {
  pageParam?: number;
  limit?: number;
}
export const getPhotos = async ({
  pageParam = 0,
  limit = LIMIT,
}: Param): Promise<Albums> => {
  const {data} = await request.get('api/albums', {
    params: {
      page: pageParam,
      limit: limit,
    },
  });
  return data;
};
