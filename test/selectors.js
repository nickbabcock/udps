import chai, { expect } from 'chai';
import { getSelectedDate, getSelectedData, getBetterDates, getMonthlyData, getWeeklyData, getHourlyData } from '../js/selectors';
import { assign, times } from 'lodash';
import moment from 'moment';

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

    it('should return data if on start of interval', function () {
      const state = {
        data: febData,
        date: moment('2012-02-02')
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props)
        .map(x => assign({}, x, { date: x.date.toDate() }));
      expect(actual).to.eql([{ date: moment('2012-02-02').toDate() }]);
    });

    it('should return data if on end of interval', function () {
      const state = {
        data: febData,
        date: moment('2012-02-04')
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props)
        .map(x => assign({}, x, { date: x.date.toDate() }));
      expect(actual).to.eql([{ date: moment('2012-02-04').toDate() }]);
    });

    it('should not return data if one day before interval', function () {
      const state = {
        data: febData,
        date: moment('2012-02-01')
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props);
      expect(actual).to.eql([]);
    });

    it('should not return data if one day after interval', function () {
      const state = {
        data: febData,
        date: moment('2012-02-05')
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props);
      expect(actual).to.eql([]);
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

    it('should not modify state', function () {
      const data = [{
        date: moment('2012-02-02')
      }, {
        date: moment('2012-02-04')
      }];

      const state = { data, date: moment('2012-02-03') };
      const props = { params: {} };
      const actual = getBetterDates(state, props).map(x => x.toDate());
      expect(actual).to.eql([new Date(2012, 1, 2), new Date(2012, 1, 4)]);
      expect(state.date.toDate()).to.eql(moment('2012-02-03').toDate());
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

    it('should not matter how the data is sorted with full year', function () {
      const data = [{
        date: moment('2011-02-04')
      }, {
        date: moment('2011-03-04')
      }, {
        date: moment('2012-02-02')
      }, {
        date: moment('2012-02-05')
      }, {
        date: moment('2012-02-01')
      }];

      const state = { data, date: moment('2012-02-06') };
      const props = { params: {} };
      const actual = getBetterDates(state, props).map(x => x.toDate());
      expect(actual).to.eql([new Date(2012, 1, 5)]);
    });
  });

  describe('#getMonthlyData()', function () {
    it('should fill out all missing data in chronological order', function () {
      const state = { data: [] };
      const actual = getMonthlyData(state);
      expect(actual).to.eql([
        ['Jan', []],
        ['Feb', []],
        ['Mar', []],
        ['Apr', []],
        ['May', []],
        ['Jun', []],
        ['Jul', []],
        ['Aug', []],
        ['Sep', []],
        ['Oct', []],
        ['Nov', []],
        ['Dec', []]
      ]);
    });

    it('should fill out all missing data in chronological order', function () {
      const state = { data: [
        { date: moment('2012-02-01') },
        { date: moment('2012-02-01') }
      ] };
      const actual = getMonthlyData(state);
      expect(actual[0]).to.eql(['Jan', []]);
      expect(actual[1][0]).to.eql('Feb');
      expect(actual[1][1]).to.have.length(2);
      expect(actual[2]).to.eql(['Mar', []]);
      expect(actual[3]).to.eql(['Apr', []]);
      expect(actual[4]).to.eql(['May', []]);
      expect(actual[5]).to.eql(['Jun', []]);
      expect(actual[6]).to.eql(['Jul', []]);
      expect(actual[7]).to.eql(['Aug', []]);
      expect(actual[8]).to.eql(['Sep', []]);
      expect(actual[9]).to.eql(['Oct', []]);
      expect(actual[10]).to.eql(['Nov', []]);
      expect(actual[11]).to.eql(['Dec', []]);
    });
  });

  describe('#getWeeklyData()', function () {
    it('should fill out all missing data in chronological order', function () {
      const state = { data: [] };
      const actual = getWeeklyData(state);
      expect(actual).to.eql([
        ['Sun', []],
        ['Mon', []],
        ['Tues', []],
        ['Wed', []],
        ['Thur', []],
        ['Fri', []],
        ['Sat', []]
      ]);
    });

    it('should fill out all missing data in chronological order', function () {
      const state = { data: [
        { date: moment('2012-02-01') },
        { date: moment('2012-02-01') }
      ] };
      const actual = getWeeklyData(state);
      expect(actual[0]).to.eql(['Sun', []]);
      expect(actual[1]).to.eql(['Mon', []]);
      expect(actual[2]).to.eql(['Tues', []]);
      expect(actual[3][0]).to.eql('Wed');
      expect(actual[3][1]).to.have.length(2);
      expect(actual[4]).to.eql(['Thur', []]);
      expect(actual[5]).to.eql(['Fri', []]);
      expect(actual[6]).to.eql(['Sat', []]);
    });
  });

  describe('#getHourlyData()', function () {
    it('should fill out all missing data in chronological order', function () {
      const state = { data: [] };
      const actual = getHourlyData(state);
      expect(actual).to.eql([
        ['0', []],
        ['1', []],
        ['2', []],
        ['3', []],
        ['4', []],
        ['5', []],
        ['6', []],
        ['7', []],
        ['8', []],
        ['9', []],
        ['10', []],
        ['11', []],
        ['12', []],
        ['13', []],
        ['14', []],
        ['15', []],
        ['16', []],
        ['17', []],
        ['18', []],
        ['19', []],
        ['20', []],
        ['21', []],
        ['22', []],
        ['23', []]
      ]);
    });

    it('should fill out all missing data in chronological order', function () {
      const state = { data: [
        { date: moment('2012-02-01 01:00:00') },
        { date: moment('2012-02-01 01:00:00') }
      ] };
      const actual = getHourlyData(state);
      times(24).forEach((x) => {
        if (x !== 1) {
          expect(actual[x][1]).to.have.length(0);
        } else {
          expect(actual[x][1]).to.have.length(2);
        }
      });
    });
  });
});
