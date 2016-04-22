import { sortBy, take, merge } from 'lodash';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import * as localforage from 'localforage';
const moment = require('moment');
import {
  REQUEST_DPS,
  REQUEST_DPS_DONE,
  SHOW_WELCOME,
  MAP_DATE_CHANGE
} from '../constants/ActionTypes';

function fetchData(dispatch) {
  dispatch({ type: REQUEST_DPS });
  return fetch('/app.json').then((x) => x.json());
}

export function updateWelcomeMessage() {
  return async (dispatch) => {
    const welcomeMessage = await localforage.getItem('showWelcomeMessage');
    dispatch({
      type: SHOW_WELCOME,
      data: welcomeMessage
    });
  };
}

export function closeWelcomeMessage() {
  return async (dispatch) => {
    await localforage.setItem('showWelcomeMessage', false);
    dispatch({
      type: SHOW_WELCOME,
      data: false
    });
  };
}

export function mapDateChange(value) {
  const date = moment(value);
  browserHistory.push(`/date/${date.format('YYYY-MM-DD')}`);
  return {
    type: MAP_DATE_CHANGE,
    data: value
  };
}

export function fetchPostsIfNeeded() {
  return async (dispatch) => {
    const lastUpdate = await localforage.getItem('last-update');
    let data = !lastUpdate || !moment().isSame(lastUpdate, 'day') ?
      await fetchData(dispatch) :
      await localforage.getItem('data');
    await localforage.setItem('last-update', moment().format());
    await localforage.setItem('data', data);
    data = data.map((x) => Object.assign(x, { date: moment(x.date) }));
    dispatch({ type: REQUEST_DPS_DONE, data });
  };
}
