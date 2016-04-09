import { createSelector } from 'reselect';
import { head, last, partition, sortBy, compact } from 'lodash';
const moment = require('moment');

const getDate = (state, props) =>
  (!props.params.incidentDate ? state.date :
    moment(props.params.incidentDate).toDate());

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

    const [bf, af] = partition(data, (x) => moment(x.date).isBefore(date, 'day'));
    const result = [
      last(sortBy(bf.map((x) => x.date))),
      head(sortBy(af.map((x) => x.date)))
    ];

    return compact(result);
  }
);
