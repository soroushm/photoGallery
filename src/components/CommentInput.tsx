import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {color, space, layout, typography} from 'styled-system';
import {themeGet} from '@styled-system/theme-get';
import {Card} from '../theme';

interface CommentInputProps {
  onSubmit: (comment: string) => string;
}

const Input = styled.TextInput`
  ${layout}
  ${space}
  ${color}
  ${typography}
  border-width: 1px;
  border-color: ${props => themeGet('colors.borderLight')(props)};
  border-radius: 5px;
  padding: 2px;
`;

const SubmitButton = styled.Text`
  ${color}
  ${typography}
  ${space}
`;

export const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  ...props
}) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit(comment.trim());
    setComment('');
  };

  return (
    <Card flexDirection="row" alignItems="center" my="sm" {...props}>
      <Input
        flex={1}
        mr="sm"
        value={comment}
        onChangeText={setComment}
        placeholder="Enter your comment"
        testID="comment-input"
        enterKeyHint="send"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <SubmitButton
          fontWeight="bold"
          color="textSecondary"
          testID="submit-button">
          Submit
        </SubmitButton>
      </TouchableOpacity>
    </Card>
  );
};
