import { getBetterDates } from '../js/selectors';
const Benchmark = require('benchmark');
const moment = require('moment');
let data = require('../test-data.json');
const suite = new Benchmark.Suite;

data = data.map(x => Object.assign({}, x, { date: moment(x.date) }));
const state = { data, date: moment('2000-02-03') };
const props = { params: {} };

suite.add('getBetterDates', () => getBetterDates(state, props))
.on('complete', function() {
  for (let i = 0; i < this.length; i++) {
    console.log(`${this[i].name}: ${(this[i].stats.mean * 1000).toFixed(2)}ms`);
  }
}).run();
