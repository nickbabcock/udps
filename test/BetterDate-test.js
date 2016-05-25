import React from 'react';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';
import { Link } from 'react-router';
import BetterDate from '../js/components/BetterDate';
import moment from 'moment';

describe('<BetterDate />', function () {
  it('should contain nice date formats', function () {
    const date = moment('2012-02-01');
    const dates = [moment('2012-02-03')];
    const wrapper = shallow(<BetterDate date={date} betterDates={dates} />);
    expect(wrapper.text()).to.contain('No incidents happened on February 1, 2012');
  });

  it('should contain link with YYYY-MM-DD format', function () {
    const date = moment('2012-02-01');
    const dates = [moment('2012-02-03')];
    const wrapper = shallow(<BetterDate date={date} betterDates={dates} />);
    const link = wrapper.find(Link);
    expect(link.prop('to')).to.eql('/date/2012-02-03');
  });

  it('should handle single better date', function () {
    const date = moment('2012-02-01');
    const dates = [moment('2012-02-03')];
    const wrapper = render(<BetterDate date={date} betterDates={dates} />);
    expect(wrapper.text()).to.contain('February 3, 2012');
  });

  it('should handle multiple better dates', function () {
    const date = moment('2012-02-01');
    const dates = [moment('2012-01-31'), moment('2012-02-03')];
    const wrapper = render(<BetterDate date={date} betterDates={dates} />);
    expect(wrapper.text()).to.contain('January 31, 2012 and February 3, 2012');
  });
});
