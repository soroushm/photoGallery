import React from 'react';
import {CommentInput} from './CommentInput';
import {
  usePostCommentMutation,
  UseCommentMutationProps,
} from '../query/usePostCommentMutation';

interface CommentSendProps {
  albumId?: string;
  options?: Omit<UseCommentMutationProps, 'albumId'>;
}

export const CommentSend: React.FC<CommentSendProps> = ({albumId, options}) => {
  const {mutate} = usePostCommentMutation({albumId, ...options});
  return <CommentInput onSubmit={comment => mutate(comment)} />;
};
