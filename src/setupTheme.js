import { red } from '@material-ui/core/colors';
import { createMuiTheme, darken, fade } from '@material-ui/core/styles';
import { PRIMARY, SECONDARY, BLACK_TEXT } from './colors';

export function getTheme() {
  return {
    primary: PRIMARY,
    secondary: SECONDARY,
  };
}

export function getMUITheme() {
  return createMuiTheme({
    palette: {
      primary: {
        light: fade(PRIMARY, 0.9),
        main: PRIMARY,
        dark: darken(PRIMARY, 0.1),
        contrastText: '#ffffff',
      },
      secondary: {
        light: fade(SECONDARY, 0.9),
        main: SECONDARY,
        dark: darken(SECONDARY, 0.1),
        contrastText: '#ffffff',
      },
      error: {
        light: red[300],
        main: red[600],
        dark: red[700],
        contrastText: '#ffffff',
      },
      text: {
        primary: BLACK_TEXT,
        secondary: fade(BLACK_TEXT, 0.6),
      },
    },
    typography: {
      htmlFontSize: 16,
      fontSize: 16,
      h1: {
        fontFamily: 'PlayfairDisplay',
        fontWeight: 'bold',
        fontSize: '48px',
        lineHeight: '72px',
        letterSpacing: '2px',
        color: '#2e2e2e',
      },
      h2: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: '24px',
        lineHeight: '36px',
        letterSpacing: '1px',
        color: '#2e2e2e',
      },
      h3: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '1px',
        color: '#2e2e2e',
      },
      subtitle1: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: '15px',
        lineHeight: '36px',
        color: '#2e2e2e',
      },
      body1: {
        fontFamily: 'Open Sans',
        fontWeight: 300,
        fontSize: '16px',
        lineHeight: '24px',
        color: '#6c6c6c',
      },
      body2: {
        fontFamily: 'Open Sans',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '24px',
        color: '#6c6c6c',
      },
    },
  });
}
