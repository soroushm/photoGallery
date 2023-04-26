import React, {ComponentProps, memo} from 'react';
import NativeFastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {color, space, layout, position, border, flexbox} from 'styled-system';
import {Card} from './Card';

export type FastImageProps = ComponentProps<typeof FastImage>;

export const FastImage = styled(NativeFastImage)`
  ${color}
  ${space}
  ${layout}
  ${position}
  ${border}
  ${flexbox}
`;

export const Image: React.FC<FastImageProps> = memo(props => {
  return (
    <Card alignItems="stretch" flex={1}>
      <FastImage {...props} flex={1} bg="paper" />
    </Card>
  );
});
