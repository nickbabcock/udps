import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './InnerApp.css';

export default class InnerApp extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
