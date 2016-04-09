import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Footer from '../js/components/Footer';
const moment = require('moment');

describe('<Footer />', function () {
  it('should give credit to the original author', function() {
    const wrapper = shallow(<Footer/>);
    expect(wrapper.text()).to.contain("Nick Babcock");
  });

  it('should render the heart emoji', function() {
    const wrapper = shallow(<Footer/>);
    expect(wrapper.text()).to.contain("❤");
  });

  it('should contain the current year', function() {
    const wrapper = shallow(<Footer/>);
    expect(wrapper.text()).to.contain(moment().year());
  });
});
