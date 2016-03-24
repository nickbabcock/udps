import React from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/lib/flat-button';
import { darkBlack } from 'material-ui/lib/styles/colors';
import styles from './Header.css';

const Header = () =>
  (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div>
         <Link to="/" onlyActiveOnIndex>
          <h1 style={{ color: darkBlack }}>Umich DPS</h1>
         </Link>
        </div>
        <div className={styles.links}>
          <Link to="/statistics"><FlatButton label="Statistics" /></Link>
          <Link to="/about"><FlatButton label="About" /></Link>
        </div>
      </div>
    </header>
  );

export default Header;
