import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Map from '../js/components/Map';

describe('<Map />', function () {
  it('should encode a given address', function () {
    const wrapper = shallow(<Map address="530 S. State Street" />);
    expect(wrapper.html()).to.contain(
      escape('530 S. State Street, Ann Arbor, MI'));
  });
});
