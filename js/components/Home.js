import React, {Component} from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Map from './Map';
import Welcome from './Welcome';
import styles from './Home.css';
import * as HomeActions from '../actions/HomeActions';

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(HomeActions.fetchPostsIfNeeded());
    dispatch(HomeActions.updateWelcomeMessage());
  }

  render() {
    const { dispatch, data, welcomeMessage } = this.props;
    const actions = bindActionCreators(HomeActions, dispatch);
    const closeFn = actions.closeWelcomeMessage;
    return (
      <main>
        { welcomeMessage !== false ? <Welcome closeFn={closeFn}/> : null }
        <Map/>
        <div className={styles['incident-container']}>
            {data.map((x) =>
              <GridTile
                key={x.id}
                title={x.description}
                subtitle={x.address}>
                <div className={styles['incident']}/>
              </GridTile>
            )}
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
