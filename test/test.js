import { expect } from 'chai';
import { getSelectedDate } from '../js/selectors';

describe('Selectors', function() {
  describe('#getDate()', function() {
    it('should return state date when param not specified', function() {
      const date = new Date();
      expect(getSelectedDate({ date }, {params: {}})).to.equal(date);
    });
  });
});
