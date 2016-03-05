import React, {Component} from 'react';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header>
        <p className={styles.banner}>
          hello
        </p>
      </header>
    );
  }
}
