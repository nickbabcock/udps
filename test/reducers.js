import chai, { expect } from 'chai';
import { date } from '../js/reducers';
import moment from 'moment';
chai.use(require('chai-datetime'));

describe('Reducers', function () {
  describe('date', function () {
    it('should return the initial date of midnight', function () {
      const now = moment();
      const today = moment(now.format('YYYY-MM-DD'));
      const yesterday = today.clone().subtract(1, 'days');
      expect(date(undefined, {}).toDate()).to.eql(yesterday.toDate());
    });
  });
});
