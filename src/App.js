import React from 'react';
import { Box, Container, ThemeProvider } from '@mui/material';
import { classes, theme } from './styles';
import { ReactComponent as Logo } from './assets/logo.svg';
import PropTypes from 'prop-types';

function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ position: 'relative' }} maxWidth="xs">
        <Box sx={classes.wrapper}>
          <Box sx={classes.logo}>
            <Logo />
          </Box>
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
