import React from 'react';
import {Provider} from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from '../store/configureStore';
import Home from '../components/Home';
import DevTools from './DevTools';

const store = configureStore({data: []});
const history = syncHistoryWithStore(browserHistory, store);

export default React.createClass({
  render() {
    return (
        <Provider store={store}>
          <div>
            <Router history={history}>
              <Route path="/" component={Home}/>
            </Router>
            {/* only renders when running in DEV mode */
              <DevTools/>
            }
          </div>
        </Provider>
    );
  }
});
