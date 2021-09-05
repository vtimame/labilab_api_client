import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'normalize.css/normalize.css';
import './assets/scss/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apolloClient';
import { StoreInstance, StoreProvider } from './store/Store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <StoreProvider value={StoreInstance}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
