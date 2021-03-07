import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';
import theme from './theme';
import client from './graphql/client';

ReactDOM.render(
  <React.StrictMode client={client}>
    <ApolloProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
