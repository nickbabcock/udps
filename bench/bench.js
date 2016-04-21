import { partition, compact, minBy, maxBy, head, last, sortBy } from 'lodash';
const Benchmark = require('benchmark');
const moment = require('moment');
const suite = new Benchmark.Suite;

// Conveniently grab a largish data set to benchmark the functions
let data = require('../test-data.json');
data = data.map(x => Object.assign({}, x, { date: moment(x.date) }));

const currentGetBetterDates = (data, date) => {
    const [bf, af] = partition(data, (x) => x.date.isBefore(date, 'day'));
    const result = [maxBy(bf, x => x.date), minBy(af, x => x.date)];
    return compact(result).map(x => x.date);
};

// Has worse complexity because we first sort and then grab the first/last
// element, which is needless work
const oldGetBetterDates = (data, date) => {
    const [bf, af] = partition(data, (x) => x.date.isBefore(date, 'day'));
    const result = [
      last(sortBy(bf.map((x) => x.date))),
      head(sortBy(af.map((x) => x.date)))
    ];
    return compact(result);
};

// Cache the date so it is not constructed on each test run
const date = moment('2000-02-03');

suite.add('getBetterDates', () => currentGetBetterDates(data, date))
.add('oldGetBetterDates', () => oldGetBetterDates(data, date))
.on('complete', function() {
  for (let i = 0; i < this.length; i++) {
    console.log(`${this[i].name}: ${(this[i].stats.mean * 1000).toFixed(2)}ms`);
  }
}).run();
