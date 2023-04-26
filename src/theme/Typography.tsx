import styled from 'styled-components/native';
import {color, space, typography} from 'styled-system';
export const Typography = styled.Text`
  ${color}
  ${space}
  ${typography}
`;

Typography.defaultProps = {
  color: 'textPrimary',
  fontSize: 'md',
  fontWeight: 'regular',
};
