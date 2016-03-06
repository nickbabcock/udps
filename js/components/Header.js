import React, {Component} from 'react';
import { Link } from 'react-router'
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.col}>
            <h1><Link to="/" onlyActiveOnIndex>Umich DPS</Link></h1>
          </div>
          <div className={styles.col}>
            <div><Link to='/statistics'>Statistics</Link></div>
            <div><Link to='/about'>About</Link></div>
          </div>
        </div>
      </header>
    );
  }
}
