import React, { Component, PropTypes } from 'react';
import Message from './Welcome.md';
import styles from './Welcome.css';
import FlatButton from 'material-ui/FlatButton';

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
        <div
          className={styles.largeFont}
          dangerouslySetInnerHTML={this.markup()}
        />
        <FlatButton
          label="x"
          style={{ alignSelf: 'flex-start', marginTop: '14px' }}
          onClick={closeFn}
        />
      </div>
    );
  }
}

Welcome.propTypes = {
  closeFn: PropTypes.func.isRequired
};
