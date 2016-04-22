import chai, { expect } from 'chai';
import { getSelectedDate, getSelectedData, getBetterDates } from '../js/selectors';
import { assign } from 'lodash';
const moment = require('moment');

chai.use(require('chai-datetime'));

describe('Selectors', function () {
  let febData = [];
  beforeEach(function () {
    febData = [{
      date: moment('2012-02-02')
    }, {
      date: moment('2012-02-03')
    }, {
      date: moment('2012-02-04')
    }];
  });

  describe('#getDate()', function () {
    it('should return state date when param not specified', function () {
      const date = moment();
      expect(getSelectedDate({ date }, { params: {} }).toDate()).to.equal(date.toDate());
    });

    it('should return param when param is specified', function () {
      const incidentDate = '2016-02-04';
      const state = { date: moment() };
      const expected = moment(incidentDate).toDate();
      expect(getSelectedDate(state, { params: { incidentDate } }).toDate()).to.equalDate(expected);
    });
  });

  describe('#getSelectedData()', function () {
    it('should return no data if data is empty', function () {
      const state = {
        data: [],
        date: moment()
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props);
      expect(actual).to.be.empty;
    });

    it('should return no data if date is not found', function () {
      const state = {
        data: febData,
        date: moment()
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props);
      expect(actual).to.be.empty;
    });

    it('should return all data if date is found', function () {
      const state = {
        data: febData,
        date: moment('2012-02-03')
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props)
        .map(x => assign({}, x, { date: x.date.toDate() }));
      expect(actual).to.eql([{ date: moment('2012-02-03').toDate() }]);
    });
  });

  describe('#getBetterDates()', function () {
    it('should return the empty list if selected data exists', function () {
      const state = {
        data: febData,
        date: moment('2012-02-03')
      };

      const props = { params: {} };
      const actual = getBetterDates(state, props);
      expect(actual).to.eql([]);
    });

    it('should return a past date when in the future', function () {
      const state = {
        data: febData,
        date: moment('2012-02-06')
      };

      const props = { params: {} };
      const actual = getBetterDates(state, props).map(x => x.toDate());
      expect(actual).to.eql([new Date(2012, 1, 4)]);
    });

    it('should return a future date when in the past', function () {
      const state = {
        data: febData,
        date: moment('2012-01-06')
      };

      const props = { params: {} };
      const actual = getBetterDates(state, props).map(x => x.toDate());
      expect(actual).to.eql([new Date(2012, 1, 2)]);
    });

    it('should return past and future date', function () {
      const data = [{
        date: moment('2012-02-02')
      }, {
        date: moment('2012-02-04')
      }];

      const state = { data, date: moment('2012-02-03') };
      const props = { params: {} };
      const actual = getBetterDates(state, props).map(x => x.toDate());
      expect(actual).to.eql([new Date(2012, 1, 2), new Date(2012, 1, 4)]);
    });

    it('should not matter how the data is sorted', function () {
      const data = [{
        date: moment('2012-02-04')
      }, {
        date: moment('2012-02-02')
      }, {
        date: moment('2012-02-05')
      }, {
        date: moment('2012-02-01')
      }];

      const state = { data, date: moment('2012-02-03') };
      const props = { params: {} };
      const actual = getBetterDates(state, props).map(x => x.toDate());
      expect(actual).to.eql([new Date(2012, 1, 2), new Date(2012, 1, 4)]);
    });
  });
});
