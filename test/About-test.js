import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import About from '../js/components/About';

describe('<About />', function () {
  it('should contain the markdown text', function () {
    const wrapper = render(<About />);
    expect(wrapper.text()).to.contain('Clery Act');
  });
});
