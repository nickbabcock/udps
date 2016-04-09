import chai, { expect } from 'chai';
import { getSelectedDate, getSelectedData, getBetterDates } from '../js/selectors';
const moment = require('moment');

chai.use(require('chai-datetime'));

describe('Selectors', function () {
  const febData = [{
    date: moment('2012-02-02').toDate()
  }, {
      date: moment('2012-02-03').toDate()
    }, {
      date: moment('2012-02-04').toDate()
    }];

  describe('#getDate()', function () {
    it('should return state date when param not specified', function () {
      const date = new Date();
      expect(getSelectedDate({ date }, { params: {} })).to.equal(date);
    });

    it('should return param when param is specified', function () {
      const incidentDate = '2016-02-04';
      const state = { date: new Date() };
      const expected = moment(incidentDate).toDate();
      expect(getSelectedDate(state, { params: { incidentDate } })).to.equalDate(expected);
    });
  });

  describe('#getSelectedData()', function () {
    it('should return no data if data is empty', function () {
      const state = {
        data: [],
        date: new Date()
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props);
      expect(actual).to.be.empty;
    });

    it('should return no data if date is not found', function () {
      const state = {
        data: febData,
        date: new Date()
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props);
      expect(actual).to.be.empty;
    });

    it('should return all data if date is found', function () {
      const state = {
        data: febData,
        date: moment('2012-02-03').toDate()
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props);
      expect(actual).to.eql([{ date: moment('2012-02-03').toDate() }]);
    });
  });

  describe('#getBetterDates()', function () {
    it('should return the empty list if selected data exists', function () {
      const state = {
        data: febData,
        date: moment('2012-02-03').toDate()
      };

      const props = { params: {} };
      const actual = getBetterDates(state, props);
      expect(actual).to.eql([]);
    });

    it('should return a past date when in the future', function () {
      const state = {
        data: febData,
        date: moment('2012-02-06').toDate()
      };

      const props = { params: {} };
      const actual = getBetterDates(state, props);
      expect(actual).to.eql([new Date(2012, 1, 4)]);
    });

    it('should return a future date when in the past', function () {
      const state = {
        data: febData,
        date: moment('2012-01-06').toDate()
      };

      const props = { params: {} };
      const actual = getBetterDates(state, props);
      expect(actual).to.eql([new Date(2012, 1, 2)]);
    });

    it('should return past and future date', function () {
      const data = [{
        date: moment('2012-02-02').toDate()
      }, {
          date: moment('2012-02-04').toDate()
        }];

      const state = { data, date: moment('2012-02-03').toDate() };
      const props = { params: {} };
      const actual = getBetterDates(state, props);
      expect(actual).to.eql([new Date(2012, 1, 2), new Date(2012, 1, 4)]);
    });

    it('should not matter how the data is sorted', function () {
      const data = [{
        date: moment('2012-02-04').toDate()
      }, {
        date: moment('2012-02-02').toDate()
      }, {
        date: moment('2012-02-05').toDate()
      }, {
        date: moment('2012-02-01').toDate()
      }];

      const state = { data, date: moment('2012-02-03').toDate() };
      const props = { params: {} };
      const actual = getBetterDates(state, props);
      expect(actual).to.eql([new Date(2012, 1, 2), new Date(2012, 1, 4)]);
    });
  });
});