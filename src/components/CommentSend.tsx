import React from 'react';
import {CommentInput} from './CommentInput';
import {
  useCommentMutation,
  UseCommentMutationProps,
} from '../query/useCommentMutation';

interface CommentSendProps {
  albumId?: string;
  options?: Omit<UseCommentMutationProps, 'albumId'>;
}

export const CommentSend: React.FC<CommentSendProps> = ({albumId, options}) => {
  const {mutate} = useCommentMutation({albumId, ...options});
  return <CommentInput onSubmit={comment => mutate(comment)} />;
};
