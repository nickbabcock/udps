import toDate from '../utils/toDate';
import * as ActionTypes from '../constants/ActionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case ActionTypes.REQUEST_DPS_DONE:
      // Not functional code, don't tell mom!
      action.data.forEach(x => x.date = toDate(x.date));
      return action.data;
    default:
      return state;
  }
}
