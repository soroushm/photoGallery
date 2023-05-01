import React, {useCallback, FC} from 'react';
import {useCommentsQuery} from '../query/useCommentsQuery';
import {Card, Image, Modal, Typography} from '../theme';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  ModalProps,
  Platform,
} from 'react-native';
import {Album, Comment} from '../type';
import {CommentSend} from './CommentSend';
import {CommentRow} from './CommentRow';

interface AlbumDetailsProps extends ModalProps {
  album?: Album;
}

export const AlbumDetails: FC<AlbumDetailsProps> = ({
  album,
  visible,
  ...props
}) => {
  const {data, fetchNextPage, isFetching, refetch} = useCommentsQuery(
    album?.albumId,
    visible,
  );
  const comments = data?.pages || [];
  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Comment>) => <CommentRow comment={item} />,
    [],
  );

  const renderHeaderComponent = useCallback(
    () => (
      <>
        <Card height={Dimensions.get('window').width - 32} mb="md">
          <Image source={{uri: album?.url}} />
        </Card>
        <Typography fontSize="sm" fontWeight="bold">
          Comments
        </Typography>
      </>
    ),
    [album],
  );
  const extractKey = useCallback(item => {
    return item.id;
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Modal visible={visible} {...props} testID="AlbumDetails">
        <Typography flex={1} pb="sm" fontWeight="bold">
          {album?.title}
        </Typography>
        <FlatList
          testID="commentList"
          {...props}
          data={comments}
          renderItem={renderItem}
          keyExtractor={extractKey}
          onEndReachedThreshold={0.1}
          onRefresh={() => refetch()}
          onEndReached={() => fetchNextPage()}
          refreshing={isFetching}
          ListHeaderComponent={renderHeaderComponent}
        />
        <CommentSend albumId={album?.albumId} />
      </Modal>
    </KeyboardAvoidingView>
  );
};
