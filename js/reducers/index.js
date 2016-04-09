import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as ActionTypes from '../constants/ActionTypes';
const moment = require('moment');

const date = (state = moment().subtract(1, 'day').toDate(), action) => {
  switch (action.type) {
    case ActionTypes.MAP_DATE_CHANGE:
      return action.data;
    default:
      return state;
  }
};

const welcomeMessage = (state = true, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_WELCOME:
      return action.data;
    default:
      return state;
  }
};

const data = (state = [], action) => {
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
