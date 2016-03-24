import React, { Component } from 'react';
import Message from './Welcome.md';
import styles from './Welcome.css';
import FlatButton from 'material-ui/lib/flat-button';

export default class Welcome extends Component {
  markup() {
    return {
      __html: Message
    };
  }
  render() {
    const { closeFn } = this.props;
    return (
      <div className={styles.leader}>
        <div className={styles.largeFont}
          dangerouslySetInnerHTML={this.markup()} />
        <FlatButton label="x"
          style={{ alignSelf: 'flex-start', marginTop: '14px' }}
          onClick={closeFn} />
      </div>
    );
  }
}
