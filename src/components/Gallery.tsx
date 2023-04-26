import React, {useCallback, FC, useState} from 'react';
import {usePhotosQuery} from '../query/usePhotosQuery';
import {
  Card,
  Image,
  PhotoList,
  PhotoListProps,
  Modal,
  Typography,
} from '../theme';
import {
  ListRenderItemInfo,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Photo} from '../type';

type GalleryProps = Omit<
  PhotoListProps<Photo>,
  'data' | 'renderItem' | 'keyExtractor'
>;

export const Gallery: FC<GalleryProps> = props => {
  const {data, fetchNextPage, isFetching, refetch} = usePhotosQuery();
  const [modalData, setModalData] = useState<Photo | null>(null);
  const images = data?.pages || [];
  const renderItem = useCallback(({item}: ListRenderItemInfo<Photo>) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalData(item)}>
        <Image source={{uri: item.thumbnailUrl}} />
      </TouchableOpacity>
    );
  }, []);

  const extractKey = useCallback(item => {
    return item.id;
  }, []);

  const onClose = () => setModalData(null);

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
      <Modal visible={!!modalData} onRequestClose={onClose}>
        <Card height={Dimensions.get('window').width - 32} mb="md">
          <Typography flex={1} pb="sm" fontWeight="bold">
            {modalData?.title}
          </Typography>
          <Image source={{uri: modalData?.url}} />
        </Card>
      </Modal>
    </Card>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
});
