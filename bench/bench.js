import { partition, compact, minBy, maxBy, head, last, sortBy } from 'lodash';
const Benchmark = require('benchmark');
const moment = require('moment');
const suite = new Benchmark.Suite;

// Conveniently grab a largish data set to benchmark the functions
const data = require('../test-data.json')
  .map(x => Object.assign({}, x, { date: moment(x.date) }));

// Doesn't use the convenient moment js function of `isBefore` and instead,
// gains more than 30x throughput
const getBetterDateswoMoment = (incidents, date) => {
  const epc = +date;
  const [bf, af] = partition(incidents, (x) => +x.date < epc);
  const result = [maxBy(bf, x => x.date), minBy(af, x => x.date)];
  return compact(result).map(x => x.date);
};

const currentGetBetterDates = (incidents, date) => {
  const [bf, af] = partition(incidents, (x) => x.date.isBefore(date, 'day'));
  const result = [maxBy(bf, x => x.date), minBy(af, x => x.date)];
  return compact(result).map(x => x.date);
};

// Has worse complexity because we first sort and then grab the first/last
// element, which is needless work
const oldGetBetterDates = (incidents, date) => {
  const [bf, af] = partition(incidents, (x) => x.date.isBefore(date, 'day'));
  const result = [
    last(sortBy(bf.map((x) => x.date))),
    head(sortBy(af.map((x) => x.date)))
  ];
  return compact(result);
};

// Cache the dates so it is not constructed on each test run
const date = moment('2000-02-03');
const date2 = moment('2000-02-04');
const [yester, nextday] = [+date, +date.add(1, 'day')]

const sameDay = (d) => date.isSame(d, 'day');
const sameDayManual = (d) => date.year() === d.year() &&
  date.month() === d.month() && date.date() === d.date();
const sameDayEpoch = (d) => +d < nextday && +d >= yester;

suite.add('getBetterDates', () => currentGetBetterDates(data, date))
.add('getBetterDateswoMoment', () => getBetterDateswoMoment(data, date))
.add('oldGetBetterDates', () => oldGetBetterDates(data, date))
.add('sameDay', () => sameDay(date2))
.add('sameDayManual', () => sameDayManual(date2))
.add('sameDayEpoch', () => sameDayEpoch(date2))
.on('complete', () => {
  for (let i = 0; i < suite.length; i++) {
    console.log(`${suite[i].name}: ${(suite[i].stats.mean * 1000 * 1000).toFixed(2)}us`);
  }
}).run();
