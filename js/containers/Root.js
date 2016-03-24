import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/configureStore';
import App from './App';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default function Root() {
  return (
    <Provider store={store}>
      <App history={history} />
    </Provider>
  );
}
