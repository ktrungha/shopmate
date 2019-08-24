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
      htmlFontSize: 14,
      fontSize: 14,
      subtitle1: { fontSize: '20px', fontWeight: 500 },
      subtitle2: { fontSize: '16px', fontWeight: 500, lineHeight: '19px' },
      body1: { fontSize: '16px', lineHeight: '19px' },
      body2: { fontSize: '14px', lineHeight: '24px', fontWeight: 'normal' },
      caption: { fontSize: '12px', lineHeight: '16px' },
      button: { fontSize: '16px', textTransform: 'none', lineHeight: '19px', fontWeight: 500 },
      h4: { fontSize: '34px', lineHeight: '40px' },
      h5: { fontSize: '24px', fontWeight: 'bold', lineHeight: '28px' },
      h6: { fontSize: '20px', lineHeight: '23px' },
    },
  });
}
