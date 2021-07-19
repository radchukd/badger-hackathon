import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    h1: { fontSize: '56px', lineHeight: '64px' },
    h2: { fontStyle: 'normal', fontWeight: 'bold', fontSize: '48px', lineHeight: '56px' },
    h3: { fontStyle: 'normal', fontWeight: 'bold', fontSize: '40px', lineHeight: '48px' },
    h4: { fontStyle: 'normal', fontWeight: 'bold', fontSize: '32px', lineHeight: '40px' },
    h5: { fontStyle: 'normal', fontWeight: 'bold', fontSize: '24px', lineHeight: '32px' },
    h6: { fontStyle: 'normal', fontWeight: 'bold', fontSize: '20px', lineHeight: '28px' },
  },
  palette: {
    primary: {
      main: '#2B2B2B',
      dark: '#111111',
      light: '#888888',
    },
    secondary: {
      main: '#ffffff',
      dark: '#1E1E1E',
    },
    info: {
      main: '#F2A627',
    },
    warning: {
      main: '#FF5C5C',
    },
    background: {
      paper: '#222222',
    },
    text: {
      primary: '#ffffff',
      secondary: '#747474',
    },
    action: {
      hover: '#242424',
    },
  },
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: '#2B2B2B',
        height: '100%',
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#121212',
      },
    },
  },
});

export default theme;
