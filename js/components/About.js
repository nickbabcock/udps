import React, {Component} from 'react';
import Message from './About.md';

export default class About extends Component {
  markup() {
    return {
      __html: Message
    };
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.markup()}/>
    );
  }
}
