import { createMuiTheme } from '@material-ui/core/styles';

export const theme = () =>
  createMuiTheme({
    palette: {
      primary: {
        main: '#bc9c6d',
        light: '#E5DECD',
        dark: '#8a6e41',
      },
      secondary: {
        main: '#503f2b',
        light: '#7d6a54',
        dark: '#271900',
      },
    },
  });

export const offlineTheme = () =>
  createMuiTheme({
    palette: {
      primary: {
        main: '#808080',
        light: '#F5F5F5',
        dark: '#303030',
      },
      secondary: {
        main: '#503f2b',
        light: '#7d6a54',
        dark: '#271900',
      },
    },
  });
