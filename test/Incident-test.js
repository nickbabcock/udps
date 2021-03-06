import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Incident from '../js/components/Incident';
import styles from '../js/components/Incident.css';
import moment from 'moment';

describe('<Incident />', function () {
  const muiTheme = getMuiTheme();
  const mountWithContext = (node) => shallow(node, { context: { muiTheme } });
  const incident = {
    id: '23103810',
    date: moment('2016-02-03'),
    address: '530 S. State',
    description: 'Hello world!'
  };

  it('should initially not be showing text', function () {
    const wrapper = mountWithContext(<Incident incident={incident} />);
    expect(wrapper.state().showText).to.eql(false);
  });

  it('should have a div with incident class', function () {
    const wrapper = mountWithContext(<Incident incident={incident} />);
    expect(styles.incident).to.not.be.empty;
    expect(wrapper.closest(`div.${styles.incident}`)).to.have.length(1);
  });

  it('should change the text state on clicking the GridTile', function () {
    const wrapper = mountWithContext(<Incident incident={incident} />);
    wrapper.find('GridTile').simulate('click');
    expect(wrapper.state().showText).to.eql(true);
  });

  it('should change the text state back to default on clicking the textual incident', function () {
    const wrapper = mountWithContext(<Incident incident={incident} />);
    wrapper.find('GridTile').simulate('click');
    expect(wrapper.state().showText).to.eql(true);
    wrapper.find(`.${styles.incidentInfo}`).simulate('click');
    expect(wrapper.state().showText).to.eql(false);
  });

  it('should contain friendly date', function () {
    const wrapper = mountWithContext(<Incident incident={incident} />);
    wrapper.find('GridTile').simulate('click');
    expect(wrapper.find(`.${styles.incidentInfo}`).text()).to.contain('Wed, Feb 3, 2016 12:00 AM');
  });
});
