import React, {FC, useCallback} from 'react';
import {Card, Typography} from '../theme';
import {Comment} from '../type';
import {useCurrentUser} from '../mocks/useCurrentUser';
import {TouchableOpacity} from 'react-native';
import {useCommentMutation} from '../query/useCommentMutation';

interface CommentRowProps {
  comment: Comment;
}

export const CommentRow: FC<CommentRowProps> = ({comment}) => {
  const {userId} = useCurrentUser();
  const {name: authorName, body, userId: authorId, albumId, id} = comment;
  const {mutate} = useCommentMutation({albumId});
  const isSameUser = userId === authorId;
  const onRemove = useCallback(
    () => mutate({id, method: 'delete'}),
    [mutate, id],
  );
  const name = isSameUser ? 'You' : authorName;
  return (
    <Card borderBottomWidth="sm" borderColor="borderLight" py="sm">
      <Card flexDirection="row" justifyContent="space-between">
        <Typography fontSize="sm" fontWeight="bold">
          {name}
        </Typography>
        {isSameUser && (
          <TouchableOpacity onPress={onRemove}>
            <Typography color="secondary" fontSize="sm">
              Remove
            </Typography>
          </TouchableOpacity>
        )}
      </Card>

      <Typography fontSize="sm">{body}</Typography>
    </Card>
  );
};
