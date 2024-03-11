import { createTheme } from '@mui/material';

export const classes = {
  wrapper: {
    marginTop: '30%',
    paddingBottom: '20px',
  },

  logo: {
    textAlign: 'center',
    margin: '0 auto 80px auto',
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: '#316FEA',
    },
    gray: {
      main: '#D3D8DC',
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
        input: {
          padding: '12px',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          color: 'rgba(0,0,0,.2)',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'initial',
          borderRadius: '8px',
          padding: '12px 16px',
        },
        outlined: {
          borderColor: '#D3D8DC',
          color: '#060E1E',
          display: 'flex',
          gap: '10px',
        },
      },
    },
  },
});
