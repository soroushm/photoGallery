import React from 'react';
import {ThemeProvider as StyledComponentsProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from './theme';
import {useColorScheme} from 'react-native';

export const ThemeProvider = ({children}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <StyledComponentsProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {children}
    </StyledComponentsProvider>
  );
};
