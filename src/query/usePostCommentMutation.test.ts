import {renderHook, act} from '@testing-library/react-hooks';
import {usePostCommentMutation} from './usePostCommentMutation';
import {useCurrentUser} from '../mocks/useCurrentUser';
import request from '../api/request';
import {wrapper} from '../utils/testUtitlity';

// Mock the useCurrentUser hook and request.post
jest.mock('../mocks/useCurrentUser');
jest.mock('../api/request');
const mockedUseCurrentUser = useCurrentUser as jest.Mock;
const mockedRequestPost = request.post as jest.Mock;

describe('useCommentMutation', () => {
  beforeEach(() => {
    mockedUseCurrentUser.mockReturnValue({
      userId: 'test-user-id',
      name: 'Test User',
    });
    mockedRequestPost.mockResolvedValue({data: {}});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls mutationFn with correct parameters', async () => {
    const {result} = renderHook(
      () => usePostCommentMutation({albumId: 'test-album-id'}),
      {wrapper},
    );

    await act(async () => {
      await result.current.mutate('Test comment');
    });

    expect(mockedRequestPost).toHaveBeenCalledWith('api/comments', {
      body: 'Test comment',
      userId: 'test-user-id',
      name: 'Test User',
      albumId: 'test-album-id',
      date: expect.any(String),
    });
  });
});
