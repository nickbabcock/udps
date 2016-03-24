import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/configureStore';
import App from './App';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App history={history} />
      </Provider>
    );
  }
}
