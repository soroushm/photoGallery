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
export const useCommentMutation = ({
  albumId,
  ...options
}: UseCommentMutationProps) => {
  const {userId, name} = useCurrentUser();
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: ({method, id, data}) =>
      request[method](
        `api/comments/${id}`,
        method === 'delete' ? undefined : {...data, userId, name}, // as we don't have authentication userid is handle here
      ),
    onSettled: () => {
      const key = ['comments', albumId];
      queryClient.invalidateQueries(key).catch();
    },
  });
};
