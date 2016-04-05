import { sortBy, take, merge } from 'lodash';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import * as localforage from 'localforage';
const moment = require('moment');
import geocode from '../utils/geocode';
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

async function getLatLng(address) {
  const addr = await localforage.getItem(address);
  if (addr) {
    return addr;
  }

  const addrReq = await geocode(`${address}, ANN ARBOR, MI`);
  const result = {
    lat: addrReq[0].geometry.location.lat(),
    lng: addrReq[0].geometry.location.lng()
  };

  await localforage.setItem(address, result);
  return result;
}

async function recent(data) {
  const ndata = take(sortBy(data, (x) => -(+moment(x.date))), 10);
  const addrs =
    ndata.map((x) => getLatLng(x.address)
      .then((geometry) => merge(x, { geometry })));
  await Promise.all(addrs);
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
  const date = moment(value).format('YYYY-MM-DD');
  browserHistory.push(`/date/${date}`);
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
    recent(data);
    await localforage.setItem('last-update', moment().format());
    await localforage.setItem('data', data);
    data = data.map((x) => Object.assign(x, { date: moment(x.date) }));
    dispatch({ type: REQUEST_DPS_DONE, data });
  };
}
