import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {CommentSend} from './CommentSend';
import {useCommentMutation} from '../query/useCommentMutation';

// Mock the useCommentMutation hook
jest.mock('../query/useCommentMutation');
const mockedUseCommentMutation = useCommentMutation as jest.Mock;

describe('CommentSend', () => {
  it('calls onSubmit when a comment is submitted', () => {
    const mutate = jest.fn();
    mockedUseCommentMutation.mockReturnValue({mutate});

    const {getByTestId} = render(<CommentSend albumId="test-album-id" />);

    const input = getByTestId('comment-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.changeText(input, 'Test comment');
    fireEvent.press(submitButton);

    expect(mutate).toHaveBeenCalledWith('Test comment');
  });
});
