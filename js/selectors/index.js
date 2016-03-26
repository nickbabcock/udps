const moment = require('moment');
import { createSelector } from 'reselect';

const getDate = (state) => state.date;
const getData = (state) => state.data;

export const getSelectedData = createSelector(
  [getData, getDate],
  (data, date) =>
    data.filter((x) => moment(x.date).isSame(date, 'day'))
);
