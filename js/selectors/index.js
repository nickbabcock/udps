import { createSelector } from 'reselect';
import { head, last, partition, sortBy, compact } from 'lodash';
const moment = require('moment');

// If someone navigates to the page like /2016-01-01, that takes precedent over
// any previous state
const getDate = (state, props) =>
  (!props.params.incidentDate ? state.date :
    moment(props.params.incidentDate).toDate());

const getData = (state) => state.data;

export const getSelectedDate = createSelector([getDate], (date) => date);

// Filter to incidents that occurred as the same day that is selected
export const getSelectedData = createSelector(
  [getData, getDate],
  (data, date) =>
    data.filter((x) => moment(x.date).isSame(date, 'day'))
);

// If no incidents occurred on a given day select the nearest past and future
// date that where incidents occurred.
export const getBetterDates = createSelector(
  [getSelectedData, getData, getDate],
  (selectedData, data, date) => {
    if (selectedData.length !== 0) {
      return [];
    }

    const [bf, af] = partition(data, (x) => moment(x.date).isBefore(date, 'day'));
    const result = [
      last(sortBy(bf.map((x) => x.date))),
      head(sortBy(af.map((x) => x.date)))
    ];

    return compact(result);
  }
);
