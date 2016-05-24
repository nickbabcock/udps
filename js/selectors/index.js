import { createSelector } from 'reselect';
import { partition, compact, minBy, maxBy, groupBy } from 'lodash';
const moment = require('moment');

// If someone navigates to the page like /2016-01-01, that takes precedent over
// any previous state
const getDate = (state, props) =>
  (!props.params.incidentDate ? state.date :
    moment(props.params.incidentDate));

const getData = (state) => state.data;

export const getSelectedDate = createSelector([getDate], (date) => date);

// Filter to incidents that occurred as the same day that is selected
export const getSelectedData = createSelector(
  [getData, getDate],
  (data, date) => {
    // "All moment objects are mutable" - Moment docs - Oof :(
    const [yester, nextday] = [+date, +date.clone().add(1, 'days')];
    return data.filter((x) => +x.date < nextday && +x.date >= yester);
  }
);

// If no incidents occurred on a given day select the nearest past and future
// date that where incidents occurred.
export const getBetterDates = createSelector(
  [getSelectedData, getData, getDate],
  (selectedData, data, date) => {
    if (selectedData.length !== 0) {
      return [];
    }

    const epc = +date;
    const [bf, af] = partition(data, (x) => +x.date < epc);
    const result = [maxBy(bf, x => x.date), minBy(af, x => x.date)];
    return compact(result).map(x => x.date);
  }
);

// Given incident data that may contain gaps, return an array representing
// months (first in the tuple) and the incidents that occurred in that month
// (second in the tuple).
export const getMonthlyData = createSelector([getData], (data) => {
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = groupBy(data, x => x.date.month());
  return shortMonths.map((x, i) => [x, monthlyData[i] || []]);
});

// Given incident data that may contain gaps, return an array representing
// weeks (0 is sunday and first in tuple) and the incidents that occurred on
// that day (second in the tuple)
export const getWeeklyData = createSelector([getData], (data) => {
  const shortWeeks = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const weeklyData = groupBy(data, x => x.date.day());
  return shortWeeks.map((x, i) => [x, weeklyData[i] || []]);
});
