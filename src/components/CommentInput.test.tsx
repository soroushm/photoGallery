import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {CommentInput} from './CommentInput';
describe('CommentInput', () => {
  it('renders correctly', () => {
    const onSubmitMock = jest.fn();

    const {getByPlaceholderText, getByText} = render(
      <CommentInput onSubmit={onSubmitMock} />,
    );

    const input = getByPlaceholderText('Enter your comment');
    const button = getByText('Submit');
    expect(button).toBeDefined();
    expect(input).toBeTruthy();
  });

  it('calls onSubmit when a comment is submitted', () => {
    const onSubmitMock = jest.fn();

    const {getByPlaceholderText, getByTestId} = render(
      <CommentInput onSubmit={onSubmitMock} />,
    );

    const input = getByPlaceholderText('Enter your comment');
    const button = getByTestId('submit-button');

    fireEvent.changeText(input, 'Test comment');
    fireEvent.press(button);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith('Test comment');
  });

  it('clears input after a comment is submitted', () => {
    const onSubmitMock = jest.fn();

    const {getByPlaceholderText, getByTestId} = render(
      <CommentInput onSubmit={onSubmitMock} />,
    );

    const input = getByPlaceholderText('Enter your comment');
    const button = getByTestId('submit-button');

    fireEvent.changeText(input, 'Test comment');
    fireEvent.press(button);

    expect(input.props.value).toBe('');
  });

  it('trims the submitted comment before calling onSubmit', () => {
    const onSubmitMock = jest.fn();

    const {getByPlaceholderText, getByTestId} = render(
      <CommentInput onSubmit={onSubmitMock} />,
    );

    const input = getByPlaceholderText('Enter your comment');
    const button = getByTestId('submit-button');

    fireEvent.changeText(input, '  Test comment with extra spaces  ');
    fireEvent.press(button);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith('Test comment with extra spaces');
  });
});
