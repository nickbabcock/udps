const moment = require('moment');
import { createSelector } from 'reselect';

const getDate = (state, props) =>
  moment(props.params.incidentDate).toDate() || state.date;
const getData = (state) => state.data;

export const getSelectedDate = createSelector([getDate], (date) => date);
export const getSelectedData = createSelector(
  [getData, getDate],
  (data, date) =>
    data.filter((x) => moment(x.date).isSame(date, 'day'))
);
