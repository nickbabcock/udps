import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../store/configureStore';
import * as HomeActions from '../actions/HomeActions';
import Home from '../components/Home';
import DevTools from './DevTools';
import Statistics from '../components/Statistics';
import About from '../components/About';
import InnerApp from '../components/InnerApp';

const store = configureStore({data: []});
const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div>
            <Router history={history}>
              <Route path="/" component={InnerApp}>
                <IndexRoute component={Home}/>
                <Route path="/statistics" component={Statistics}/>
                <Route path="/about" component={About}/>
              </Route>
            </Router>
            {/* only renders when running in DEV mode */
              <DevTools/>
            }
          </div>
        </Provider>
    );
  }
};

function select(state) {
  return {
    data: state.data,
    welcomeMessage: state.welcomeMessage
  }
}

export default connect(select)(App)