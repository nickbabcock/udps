import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Welcome from '../js/components/Welcome';

describe('<Welcome />', function () {
  it('should contain the rendered message', function () {
    const wrapper = mount(<Welcome closeFn={() => { }} />);
    expect(wrapper.text()).to.contain('Clery Act');
  });

  it('should call closeFn once when button is clicked', function () {
    const spy = sinon.spy();
    const wrapper = mount(<Welcome closeFn={spy} />);
    wrapper.find('button').simulate('click');
    expect(spy).to.be.calledOnce;
  });
});

