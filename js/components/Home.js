import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/HomeActions';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import styles from '../../css/app.css';
import Header from './Header';
import Map from './Map';
import Welcome from './Welcome';

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(HomeActions.fetchPostsIfNeeded());
    dispatch(HomeActions.updateWelcomeMessage());
  }

  render() {
    const {title, dispatch, data, welcomeMessage} = this.props;
    const actions = bindActionCreators(HomeActions, dispatch);
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '75%',
        height: 400,
        overflowY: 'auto',
        marginBottom: 24,
      },
    };

    return (
      <main>
        <Header/>
        { welcomeMessage !== false ? <Welcome closeFn={actions.closeWelcomeMessage}/> : null }
        <Map/>
        <h1 className={styles.text}>Welcome {title}!</h1>
        <button onClick={(e) => actions.changeTitle(prompt())}>
          Update Title
        </button>
        <div style={styles.root}>
          <GridList cellHeight={300} style={styles.gridList} cols={4}>
            {data.map((x) =>
              <GridTile
                key={x.id}
                title={x.description}
                subtitle={x.address}>
                <img src='https://www.fillmurray.com/g/250/300'/>
              </GridTile>
            )}
          </GridList>
        </div>
      </main>
    );
  }
}

function select(state) {
  return {
    data: state.data,
    welcomeMessage: state.welcomeMessage
  }
}

export default connect(select)(Home)
