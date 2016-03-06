import { combineReducers } from 'redux';
import Sample from './Sample';
import mostRecent from './mostRecent';
import data from './data';
import welcomeMessage from './welcomeMessage';

export default combineReducers({
  Sample,
  mostRecent,
  data,
  welcomeMessage
});
