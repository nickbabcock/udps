import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Incident from '../js/components/Incident';
import styles from '../js/components/Incident.css';
const moment = require('moment');

describe('<Incident />', function () {
  const incident = {
    id: '23103810',
    date: moment('2016-02-03'),
    address: '530 S. State',
    description: 'Hello world!'
  };

  it('should initially not be showing text', function () {
    const wrapper = mount(<Incident incident={incident} />);
    expect(wrapper.state().showText).to.eql(false);
  });

  it('should have a div with incident class', function () {
    const wrapper = mount(<Incident incident={incident} />);
    expect(styles.incident).to.not.be.empty;
    expect(wrapper.closest(`div.${styles.incident}`)).to.have.length(1);
  });
});
