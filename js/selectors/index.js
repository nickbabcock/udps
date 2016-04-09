import { createSelector } from 'reselect';
import { head, last } from 'lodash';
const moment = require('moment');

const getDate = (state, props) =>
  moment(props.params.incidentDate).toDate() || state.date;
const getData = (state) => state.data;

export const getSelectedDate = createSelector([getDate], (date) => date);
export const getSelectedData = createSelector(
  [getData, getDate],
  (data, date) =>
    data.filter((x) => moment(x.date).isSame(date, 'day'))
);

export const getBetterDates = createSelector(
  [getSelectedData, getData, getDate],
  (selectedData, data, date) => {
    if (selectedData.length !== 0) {
      return [];
    }

    const prev = last(data.filter((x) => moment(x.date).isBefore(date, 'day')));
    const next = head(data.filter((x) => moment(x.date).isAfter(date, 'day')));

    let result = [];
    if (prev) {
      result.push(prev.date);
    }

    if (next) {
      result.push(next.date);
    }

    return result;
  }
);
