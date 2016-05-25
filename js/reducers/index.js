import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import moment from 'moment';
import * as ActionTypes from '../constants/ActionTypes';

export const date = (state = moment().subtract(1, 'day').startOf('day'), action) => {
  switch (action.type) {
    case ActionTypes.MAP_DATE_CHANGE:
      return action.data;
    default:
      return state;
  }
};

export const welcomeMessage = (state = true, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_WELCOME:
      return action.data;
    default:
      return state;
  }
};

export const data = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_DPS_DONE:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  welcomeMessage,
  date,
  routing: routerReducer
});
