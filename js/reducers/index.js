import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import mostRecent from './mostRecent';
import data from './data';
import welcomeMessage from './welcomeMessage';

export default combineReducers({
  mostRecent,
  data,
  welcomeMessage,
  routing: routerReducer
});
