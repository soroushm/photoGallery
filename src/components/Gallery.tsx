import React, {useCallback, FC, useState} from 'react';
import {usePhotosQuery} from '../query/usePhotosQuery';
import {Card, Image, PhotoList, PhotoListProps} from '../theme';
import {ListRenderItemInfo, Pressable, StyleSheet} from 'react-native';
import {Photo} from '../type';
import {AlbumDetails} from './AlbumDetails';

type GalleryProps = Omit<
  PhotoListProps<Photo>,
  'data' | 'renderItem' | 'keyExtractor'
>;

export const Gallery: FC<GalleryProps> = props => {
  const {data, fetchNextPage, isFetching, refetch} = usePhotosQuery();
  const [selectedAlbum, setSelectedAlbum] = useState<Photo | undefined>();
  const images = data?.pages || [];
  const renderItem = useCallback(({item}: ListRenderItemInfo<Photo>) => {
    return (
      <Pressable
        style={styles.imageContainer}
        onPress={() => setSelectedAlbum(item)}>
        <Image source={{uri: item.thumbnailUrl}} />
      </Pressable>
    );
  }, []);

  const extractKey = useCallback(item => {
    return item.id;
  }, []);

  const onClose = () => setSelectedAlbum();

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
      <AlbumDetails
        visible={!!selectedAlbum}
        onRequestClose={onClose}
        album={selectedAlbum}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
});
