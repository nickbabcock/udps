import React, { PropTypes } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './InnerApp.css';

const InnerApp = ({ children }) => (
  <div className={styles.app}>
    <Header />
    <div className={styles.content}>
      {children}
    </div>
    <Footer />
  </div>
);

InnerApp.propTypes = {
  children: PropTypes.element.isRequired
};

export default InnerApp;
