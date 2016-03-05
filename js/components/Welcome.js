import React, {Component} from 'react';
import Message from './Welcome.md';
import styles from './Welcome.css';

export default class Welcome extends Component {
  markup() {
    return {
      __html: Message
    };
  }
  render() {
    return (
      <div className={styles.leader}>
        <div className={styles.largeFont}
             dangerouslySetInnerHTML={this.markup()}/>
      </div>
    )
  }
}
