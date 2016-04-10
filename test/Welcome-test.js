import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Welcome from '../js/components/Welcome';

describe('<Welcome />', function () {
  it('should contain the rendered message', function () {
    const wrapper = mount(<Welcome closeFn={() => { } } />);
    expect(wrapper.text()).to.contain('Clery Act');
  });
});

