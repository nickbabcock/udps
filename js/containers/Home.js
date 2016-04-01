import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Welcome from '../components/Welcome';
import styles from './Home.css';
import * as HomeActions from '../actions/HomeActions';
import { getSelectedData } from '../selectors';

class Home extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchPostsIfNeeded();
    actions.updateWelcomeMessage();
  }

  render() {
    const { welcomeMessage, date, actions, selectedData } = this.props;
    const closeFn = actions.closeWelcomeMessage;
    return (
      <main>
        <div>
          <label className={styles['date-label']}>
            Date of Incidents
            <DatePicker
              className={styles['date-picker']}
              value={date}
              onChange={(e, d) => actions.mapDateChange(d)}
            />
          </label>
        </div>
        { welcomeMessage !== false ? <Welcome closeFn={closeFn} /> : null }
        <div className={styles['incident-container']}>
            {selectedData.map((x) =>
              <GridTile
                key={x.id}
                title={x.description}
                subtitle={x.address}
              >
                <div className={styles.incident} />
              </GridTile>
            )}
        </div>
      </main>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  selectedData: PropTypes.array.isRequired,
  welcomeMessage: PropTypes.bool,
  date: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  welcomeMessage: state.welcomeMessage,
  date: state.date,
  selectedData: getSelectedData(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(HomeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
