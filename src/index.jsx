import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './components/App';

// Set Up Fake Backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);