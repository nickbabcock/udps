import chai, { expect } from 'chai';
import { getSelectedDate } from '../js/selectors';
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
});
