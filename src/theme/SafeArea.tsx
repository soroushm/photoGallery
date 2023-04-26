import styled from 'styled-components/native';
import {color, border, flexbox} from 'styled-system';

export const SafeArea = styled.SafeAreaView`
  ${color}
  ${border}
  ${flexbox}
`;

SafeArea.defaultProps = {
  bg: 'background',
};
