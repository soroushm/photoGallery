import {Photo} from '../type';
import request from './request';

export type Photos = Photo[];

interface Param {
  pageParam?: number;
  limit?: number;
}
export const getPhotos = async ({
  pageParam = 0,
  limit = 100,
}: Param): Promise<Photos> => {
  const {data} = await request.get('/photos', {
    params: {
      _page: pageParam,
      _limit: limit,
    },
  });
  return data;
};
