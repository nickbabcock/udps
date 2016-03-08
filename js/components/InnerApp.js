import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';

export default class InnerApp extends Component {
  render() {
    const styles = {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    };

    return (
      <div style={styles}>
        <Header/>
        <div style={{flex: '1'}}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}
