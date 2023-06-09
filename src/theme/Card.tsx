import {ComponentProps} from 'react';
import styled from 'styled-components/native';
import {color, space, layout, position, border, flexbox} from 'styled-system';

export const Card = styled.View`
  ${color}
  ${space}
  ${layout}
  ${position}
  ${border}
  ${flexbox}
`;

export type CardProps = ComponentProps<typeof Card>;
