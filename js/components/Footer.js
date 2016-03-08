import React, {Component} from 'react';
import styles from './Footer.css';

export default class Footer extends Component {
  render() {
    const footmsg = 'Made with \u2764 by '
    return (
      <footer className={styles.footer}>
        <p>{footmsg} <a href="https://nbsoftsolutions.com">Nick Babcock</a> 2016</p>
      </footer>
    );
  }
}
