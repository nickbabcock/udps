import { sortBy, take, merge } from 'lodash';
import fetch from 'isomorphic-fetch';
import * as localforage from 'localforage';
const moment = require('moment');
import geocode from '../utils/geocode';
import { TITLE_CHANGED, REQUEST_DPS, REQUEST_DPS_DONE, SHOW_WELCOME } from '../constants/ActionTypes';

export function changeTitle(text) {
  return {
    type: TITLE_CHANGED,
    text
  }
}

function fetchData(dispatch) {
  dispatch({ type: REQUEST_DPS });
  return fetch('/app.json').then((x) => x.json());
}

async function recent(data) {
  data = take(sortBy(data, (x) => -(+moment(x.date))), 10);
  const addrs =
    data.map((x) => getLatLng(x.address)
      .then((geometry) => merge(x, { geometry })));
  const res = await Promise.all(addrs);
}

async function getLatLng(address) {
    const addr = await localforage.getItem(address);
    if (addr) {
      return addr;
    }

    const addrReq = await geocode(address + ', ANN ARBOR, MI');
    const result = {
      lat: addrReq[0].geometry.location.lat(),
      lng: addrReq[0].geometry.location.lng()
    };

    await localforage.setItem(address, result);
    return result;
}

export function updateWelcomeMessage() {
  return async (dispatch) => {
    const welcomeMessage = await localforage.getItem('showWelcomeMessage');
    dispatch({
      type: SHOW_WELCOME,
      data: welcomeMessage
    });
  }
}

export function closeWelcomeMessage() {
  return async (dispatch) => {
    await localforage.setItem('showWelcomeMessage', false);
    dispatch({
      type: SHOW_WELCOME,
      data: false
    });
  }
}

export function fetchPostsIfNeeded() {
  return async (dispatch) => {
    const lastUpdate = await localforage.getItem('last-update');
    const data = !lastUpdate || !moment().isSame(lastUpdate, 'day') ?
      await fetchData(dispatch) :
      await localforage.getItem('data');
    recent(data);
    await localforage.setItem('last-update', moment().format());
    await localforage.setItem('data', data);
    dispatch({ type: REQUEST_DPS_DONE, data });
  }
}
