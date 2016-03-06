import React, {Component} from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import styles from '../../css/app.css';
import Map from './Map';
import Welcome from './Welcome';

export default class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(HomeActions.fetchPostsIfNeeded());
    dispatch(HomeActions.updateWelcomeMessage());
  }

  render() {
    const {data, welcomeMessage} = this.props;
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
        { welcomeMessage !== false ? <Welcome closeFn={actions.closeWelcomeMessage}/> : null }
        <Map/>
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
