import { combineReducers } from 'redux';
import Sample from './Sample';
import mostRecent from './mostRecent';
import data from './data';

export default combineReducers({
  Sample,
  mostRecent,
  data
});
