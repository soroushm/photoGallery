import React from 'react';
import {Card, Typography} from '../theme';
import {Text} from 'react-native';

export const Gallary: React.FC = () => {
  const content = 'some Random Text';
  const title = 'The title';

  return (
    <Card>
      <Card bg="default" p={4}>
        <Typography fontWeight="bold" mt="sm">
          {title}
        </Typography>

        <Typography color="textSecondary">{content}</Typography>
      </Card>
      <Card bg="primary" p={4}>
        <Typography fontWeight="bold" fontSize="lg" mt="sm">
          {title}
        </Typography>

        <Text>{content}</Text>
      </Card>
      <Card bg="secondary" p={4}>
        <Typography fontWeight="bold" color="textPrimary" fontSize="lg" mt="sm">
          {title}
        </Typography>

        <Typography color="textSecondary">{content}</Typography>
      </Card>
      <Card bg="default" p={4}>
        <Typography fontWeight="bold" fontSize="lg" mt="sm">
          {title}
        </Typography>

        <Text>{content}</Text>
      </Card>
    </Card>
  );
};
