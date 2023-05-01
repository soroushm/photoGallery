import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {CommentSend} from './CommentSend';
import {usePostCommentMutation} from '../query/usePostCommentMutation';

// Mock the useCommentMutation hook
jest.mock('../query/useCommentMutation');
const mockedUsePostCommentMutation = usePostCommentMutation as jest.Mock;

describe('CommentSend', () => {
  it.skip('calls onSubmit when a comment is submitted', () => {
    const mutate = jest.fn();
    mockedUsePostCommentMutation.mockReturnValue({mutate});

    const {getByTestId} = render(<CommentSend albumId="test-album-id" />);

    const input = getByTestId('comment-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.changeText(input, 'Test comment');
    fireEvent.press(submitButton);

    expect(mutate).toHaveBeenCalledWith('Test comment');
  });
});
