import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Header from '../js/components/Header';

describe('<Header />', function () {
  it('should contain the html5 header tag', function () {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header')).to.have.length(1);
  });
});
