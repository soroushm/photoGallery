import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import request from '../api/request';
import {useCurrentUser} from '../mocks/useCurrentUser';

export interface UseCommentMutationProps extends UseMutationOptions {
  albumId?: string;
}
export const usePostCommentMutation = ({
  albumId,
  onSuccess,
  ...options
}: UseCommentMutationProps) => {
  const {userId, name} = useCurrentUser();
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: comments =>
      request.post('api/comments', {
        body: comments,
        userId,
        name,
        albumId,
        date: new Date().toISOString(),
      }),
    onSuccess: (...data) => {
      const key = ['comments', albumId];
      queryClient.invalidateQueries(key).catch();
      onSuccess && onSuccess(...data);
    },
  });
};
