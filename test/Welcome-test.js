import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Welcome from '../js/components/Welcome';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<Welcome />', function () {
  const muiTheme = getMuiTheme();
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});

/*  it('should contain the rendered message', function () {
    const wrapper = mountWithContext(<Welcome closeFn={() => { }} />);
    expect(wrapper.text()).to.contain('Clery Act');
  });

  it('should call closeFn once when button is clicked', function () {
    const spy = sinon.spy();
    const wrapper = mountWithContext(<Welcome closeFn={spy} />);
    wrapper.find('button').simulate('click');
    expect(spy).to.be.calledOnce;
  });*/
});

