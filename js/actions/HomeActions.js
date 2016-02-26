import fetch from 'isomorphic-fetch';
import * as localforage from 'localforage';
const moment = require('moment');
import { TITLE_CHANGED, REQUEST_DPS, REQUEST_DPS_DONE } from '../constants/ActionTypes';

export function changeTitle(text) {
  return {
    type: TITLE_CHANGED,
    text
  }
}

function fetchData(dispatch) {
  dispatch({ type: REQUEST_DPS });
  return fetch('/app.json').then(x => x.json());
}

export function fetchPostsIfNeeded() {
  return async dispatch => {
    const lastUpdate = await localforage.getItem('last-update');
    const data = !lastUpdate || !moment().isSame(lastUpdate, 'day') ?
      await fetchData(dispatch) :
      await localforage.getItem('data');

    await localforage.setItem('last-update', moment().format());
    await localforage.setItem('data', data);
    dispatch({ type: 'hello', data });
  }
}
