import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Home from './Home';
import DevTools from './DevTools';
import Statistics from '../components/Statistics';
import About from '../components/About';
import InnerApp from '../components/InnerApp';

const App = ({ history }) => (
  <div style={{ minHeight: '100%', height: '100%' }}>
    <Router history={history}>
      <Route path="/" component={InnerApp}>
        <IndexRoute component={Home} />
        <Route path="/date/:incidentDate" component={Home} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
    { __DEV__ ? <DevTools /> : null }
  </div>
);

App.propTypes = {
  history: PropTypes.object.isRequired
};

export default App;
