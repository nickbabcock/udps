import React from 'react';
import styles from './Footer.css';

const Footer = () => {
  const footmsg = 'Made with \u2764 by ';
  return (
    <footer className={styles.footer}>
      <p>{footmsg} <a href="https://nbsoftsolutions.com">Nick Babcock</a> 2016</p>
    </footer>
  );
};

export default Footer;
