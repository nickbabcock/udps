import { sortBy, take } from 'lodash';
import toDate from '../utils/toDate';
import * as ActionTypes from '../constants/ActionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case ActionTypes.REQUEST_DPS_DONE:
      return take(sortBy(action.data, (x) => -(+toDate(x.date))), 10);
    default:
      return state;
  }
}
