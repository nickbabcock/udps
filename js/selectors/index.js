import { createSelector } from 'reselect';
import { partition, compact, minBy, maxBy } from 'lodash';
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
  (data, date) =>
    data.filter((x) => x.date.year() === date.year() &&
      x.date.month() === date.month() &&
      x.date.date() === date.date())
);

// If no incidents occurred on a given day select the nearest past and future
// date that where incidents occurred.
export const getBetterDates = createSelector(
  [getSelectedData, getData, getDate],
  (selectedData, data, date) => {
    if (selectedData.length !== 0) {
      return [];
    }

    const [bf, af] = partition(data, (x) =>
      x.date.year() <= date.year() && x.date.month() <= date.month() &&
      x.date.date() < date.date());
    const result = [maxBy(bf, x => x.date), minBy(af, x => x.date)];
    return compact(result).map(x => x.date);
  }
);
