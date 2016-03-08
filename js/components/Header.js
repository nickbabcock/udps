import React, {Component} from 'react';
import { Link } from 'react-router'
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.col}>
           <Link to="/" onlyActiveOnIndex><h1>Umich DPS</h1></Link>
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
