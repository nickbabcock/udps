import chai, { expect } from 'chai';
import { getSelectedDate, getSelectedData } from '../js/selectors';
const moment = require('moment');

chai.use(require('chai-datetime'));

describe('Selectors', function () {
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

  describe('#getSelectedData', function () {
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
        data: [{
          date: moment('2012-02-02').toDate()
        }, {
          date: moment('2012-02-03').toDate()
        }, {
          date: moment('2012-02-04').toDate()
        }],
        date: new Date()
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props);
      expect(actual).to.be.empty;
    });

    it('should return all data if date is found', function () {
      const state = {
        data: [{
          date: moment('2012-02-02').toDate()
        }, {
          date: moment('2012-02-03').toDate()
        }, {
          date: moment('2012-02-04').toDate()
        }],
        date: moment('2012-02-03').toDate()
      };

      const props = { params: {} };
      const actual = getSelectedData(state, props);
      expect(actual).to.eql([{ date: moment('2012-02-03').toDate() }]);
    });
  });
});
