import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import InnerApp from '../js/components/InnerApp';
import Header from '../js/components/Header';
import Footer from '../js/components/Footer';

describe('<InnerApp />', function () {
  it('should contain a header', function () {
    const wrapper = shallow(<InnerApp children={<div className="foo" />} />);
    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('should contain a footer', function () {
    const wrapper = shallow(<InnerApp children={<div className="foo" />} />);
    expect(wrapper.find(Footer)).to.have.length(1);
  });

  it('should contain the children', function () {
    const wrapper = shallow(<InnerApp children={<div className="foo" />} />);
    expect(wrapper.find('div.foo')).to.have.length(1);
  });
});
