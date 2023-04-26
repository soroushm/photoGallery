import {
  grey,
  amber,
  orange,
  green,
  black,
  bluegrey,
  deeporange,
} from './palette.json';
type SpacingArgument = 0.5 | 1 | 2 | 3 | 4 | 5;

const spacing = (space: SpacingArgument) => 8 * space;

export const defaultTheme = {
  space: {
    xs: spacing(0.5),
    sm: spacing(1),
    md: spacing(2),
    lg: spacing(3),
    xl: spacing(4),
    xxl: spacing(5),
  },
  borderWidths: {
    sm: 1,
    md: 2,
  },
  fonts: {
    primary: 'Verdana, sans-serif',
    secondary: "'Trebuchet MS', Helvetica, sans-serif",
  },
  fontSizes: {
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  fontWeights: {
    regular: 400,
    bold: 800,
  },
};

export const darkTheme = {
  ...defaultTheme,
  colors: {
    default: grey[800],
    primary: amber[700],
    secondary: orange[700],
    paper: grey[100],
    error: deeporange[700],
    success: green[700],
    background: grey[900],
    textPrimary: grey[900],
    textSecondary: grey[500],
  },
  borders: {
    light: grey[600],
    primary: grey[800],
  },
};

export const lightTheme = {
  ...defaultTheme,
  colors: {
    default: grey[300],
    primary: amber[400],
    secondary: orange[500],
    paper: grey[600],
    error: deeporange[700],
    success: green[700],
    background: grey[50],
    textPrimary: black,
    textSecondary: grey[800],
  },
  borders: {
    light: bluegrey[200],
    primary: bluegrey[500],
  },
};
