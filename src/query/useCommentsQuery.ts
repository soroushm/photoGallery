import {getComments} from '../api/getComments';
import {useInfiniteQuery} from '@tanstack/react-query';

export const useCommentsQuery = (albumId?: string, enabled = true) => {
  const key = ['comments', albumId];
  return useInfiniteQuery(
    key,
    async ({pageParam}) => getComments({pageParam, albumId}),
    {
      enabled,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage?.length) {
          // We've reached the end of the list
          return undefined;
        }
        // Return the next page number to fetch
        return allPages.length;
      },
      select: data => ({
        ...data,
        pages: data.pages.reduce((prevPages, page) => {
          return [...prevPages, ...page];
        }, []),
      }),
    },
  );
};
