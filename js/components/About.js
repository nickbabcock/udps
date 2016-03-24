import React, { Component } from 'react';
import Message from './About.md';
import styles from './About.css';

export default class About extends Component {
  markup() {
    return {
      __html: Message
    };
  }

  render() {
    return (
      <div className={styles.textual} dangerouslySetInnerHTML={this.markup()} />
    );
  }
}
