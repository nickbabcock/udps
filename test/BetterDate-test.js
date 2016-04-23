import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import BetterDate from '../js/components/BetterDate';
const moment = require('moment');

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
});
