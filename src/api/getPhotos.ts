import {Photo} from '../type';
import request from './request';

export type Response = Photo[];

interface Param {
  pageParam?: number;
  limit?: number;
}
export const getPhotos = async ({
  pageParam = 0,
  limit = 1,
}: Param): Promise<Response> => {
  const {data} = await request.get('api/photos', {
    params: {
      _page: pageParam,
      _limit: limit,
    },
  });
  return data;
};
