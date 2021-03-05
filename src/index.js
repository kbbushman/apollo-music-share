import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
