import {renderHook, act} from '@testing-library/react-hooks';
import {useCommentMutation} from './useCommentMutation';
import {useCurrentUser} from '../mocks/useCurrentUser';
import request from '../api/request';
import {wrapper} from '../utils/testUtitlity';

// Mock the useCurrentUser hook and request.post
jest.mock('../mocks/useCurrentUser');
jest.mock('../api/request');
const mockedUseCurrentUser = useCurrentUser as jest.Mock;
const mockedRequest = request as jest.Mocked<typeof request>;

const currentUser = {
  userId: '1',
  name: 'Test User',
};

describe('useCommentMutation', () => {
  beforeEach(() => {
    mockedUseCurrentUser.mockReturnValue(currentUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('successfully remove comment and invalidates queries', async () => {
    const requestData = {
      method: 'delete',
      id: '1',
    };

    mockedRequest.delete.mockResolvedValue('success');
    const {result, waitFor} = renderHook(
      () => useCommentMutation({albumId: '1'}),
      {wrapper},
    );

    await act(async () => {
      await result.current.mutate(requestData);
    });

    await waitFor(() => result.current.isSuccess);
    expect(mockedRequest.delete).toHaveBeenCalledWith('api/comments/1', {
      ...requestData.data,
      userId: currentUser.userId,
      name: currentUser.name,
    });
    expect(result.current.data).toBe('success');
  });

  it.skip('successfully update comment and invalidates queries', async () => {
    const requestData = {
      method: 'put',
      id: '1',
      data: {
        body: 'Test comment',
      },
    };

    mockedRequest.put.mockResolvedValue('success');
    const {result, waitFor} = renderHook(
      () => useCommentMutation({albumId: '1'}),
      {wrapper},
    );

    await act(async () => {
      await result.current.mutate(requestData);
    });

    await waitFor(() => result.current.isSuccess);
    expect(mockedRequest.put).toHaveBeenCalledWith('api/comments/1', {
      ...requestData.data,
      userId: currentUser.userId,
      name: currentUser.name,
    });

    expect(result.current.data).toBe('success');
  });
});
