import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {CommentRow} from './CommentRow';
import {createMockAlbumComments} from '../mocks/comments';
import {useCurrentUser} from '../mocks/useCurrentUser';
import {useCommentMutation} from '../query/useCommentMutation';
import {wrapper} from '../utils/testUtitlity';

// Mock the useCurrentUser hook and useCommentMutation
jest.mock('../mocks/useCurrentUser');
jest.mock('../query/useCommentMutation');
const mockedUseCurrentUser = useCurrentUser as jest.Mock;
const mockedUseCommentMutation = useCommentMutation as jest.Mock;

describe('CommentsRow', () => {
  const comment = createMockAlbumComments('1');

  it.skip('renders comment author and body', () => {
    mockedUseCurrentUser.mockReturnValue({userId: '2'});
    const {getByText} = render(<CommentRow comment={comment} />, {wrapper});
    const authorName = getByText(comment.name);
    const body = getByText(comment.body);
    expect(authorName).toBeDefined();
    expect(body).toBeDefined();
  });

  it.skip('displays "You" for the current user and shows Remove button', () => {
    mockedUseCurrentUser.mockReturnValue({userId: comment.userId});
    const {getByText} = render(<CommentRow comment={comment} />, {wrapper});
    const youText = getByText('You');
    const removeButton = getByText('Remove');
    expect(youText).toBeDefined();
    expect(removeButton).toBeDefined();
  });

  it.skip('calls onRemove when clicking the Remove button', () => {
    const mutateSpy = jest.fn();
    mockedUseCurrentUser.mockReturnValue({userId: comment.userId});
    mockedUseCommentMutation.mockReturnValue({mutate: mutateSpy});

    const {getByText} = render(<CommentRow comment={comment} />, {wrapper});
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);

    expect(mutateSpy).toHaveBeenCalledWith({
      id: comment.id,
      method: 'delete',
    });
  });
});
