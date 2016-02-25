import fetch from 'isomorphic-fetch'
import {TITLE_CHANGED} from '../constants/ActionTypes';

export function changeTitle(text) {
  return {
    type: TITLE_CHANGED,
    text
  }
}

export function fetchPostsIfNeeded() {
  return async dispatch => {
    const data = await fetch('/app.json').then(x => x.json());
    dispatch({ type: 'hello', data });
  }
}
