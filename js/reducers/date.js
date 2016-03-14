import * as ActionTypes from '../constants/ActionTypes';

export default function(state = new Date(), action) {
  switch (action.type) {
    case ActionTypes.MAP_DATE_CHANGE:
      return action.data;
    default:
      return state;
  }
}