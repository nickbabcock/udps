import React, {Component} from 'react';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.col}>
            <h1>Umich DPS</h1>
          </div>
          <div className={styles.col}>
            <div>Statistics</div>
            <div>About</div>
          </div>
        </div>
      </header>
    );
  }
}
