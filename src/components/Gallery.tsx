import React, {useCallback, FC} from 'react';
import {usePhotosQuery} from '../query/usePhotosQuery';
import {Card, Image, PhotoList, PhotoListProps} from '../theme';
import {ListRenderItemInfo} from 'react-native';
import {Photo} from '../type';

type GalleryProps = Omit<
  PhotoListProps<Photo>,
  'data' | 'renderItem' | 'keyExtractor'
>;

export const Gallery: FC<GalleryProps> = props => {
  const {data, fetchNextPage, isFetching, refetch} = usePhotosQuery();
  const images = data?.pages || [];
  const renderItem = useCallback(({item}: ListRenderItemInfo<Photo>) => {
    return <Image source={{uri: item.thumbnailUrl}} />;
  }, []);

  const extractKey = useCallback(item => {
    return item.id;
  }, []);

  return (
    <Card flex={1} alignItems="stretch" justifyContent="center">
      <PhotoList
        {...props}
        data={images}
        renderItem={renderItem}
        keyExtractor={extractKey}
        onEndReachedThreshold={0.1}
        onRefresh={() => refetch()}
        onEndReached={() => fetchNextPage()}
        refreshing={isFetching}
      />
    </Card>
  );
};
