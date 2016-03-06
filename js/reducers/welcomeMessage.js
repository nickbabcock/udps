import * as ActionTypes from '../constants/ActionTypes';

export default function(state = true, action) {
  switch (action.type) {
    case ActionTypes.SHOW_WELCOME:
      console.log(action.data);
      return action.data;
    default:
      return state;
  }
}