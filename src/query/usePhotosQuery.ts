import {getAlbums} from '../api/getAlbums';
import {useInfiniteQuery} from '@tanstack/react-query';
export const usePhotosQuery = () => {
  const key = ['photos'];
  return useInfiniteQuery(key, getAlbums, {
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
  });
};
