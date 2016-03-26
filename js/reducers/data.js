import * as ActionTypes from '../constants/ActionTypes';

export default function (state = [], action) {
  switch (action.type) {
    case ActionTypes.REQUEST_DPS_DONE:
      return action.data;
    default:
      return state;
  }
}
