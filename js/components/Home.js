import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/HomeActions';
import AppBar from 'material-ui/lib/app-bar';
import styles from '../../css/app.css';

class Home extends Component {
  render() {
    const {title, dispatch} = this.props;
    const actions = bindActionCreators(HomeActions, dispatch);
    return (
      <main>
        <AppBar
          title="Umich DPS"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <h1 className={styles.text}>Welcome {title}!</h1>
        <button onClick={e => actions.changeTitle(prompt())}>
          Update Title
        </button>
      </main>
    );
  }
}

export default connect(state => state.Sample)(Home)
