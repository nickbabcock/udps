import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import Home from '../components/Home';
import DevTools from './DevTools';
import Statistics from '../components/Statistics';
import About from '../components/About';
import InnerApp from '../components/InnerApp';

export default class App extends Component {
  render() {
    const { history } = this.props;
    return (
      <div style={{ minHeight: '100%', height: '100%' }}>
        <Router history={history}>
          <Route path="/" component={InnerApp}>
            <IndexRoute component={Home} />
            <Route path="/statistics" component={Statistics} />
            <Route path="/about" component={About} />
          </Route>
        </Router>
        {/* only renders when running in DEV mode */
          <DevTools />
        }
      </div>
    );
  }
}
