import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Welcome from '../components/Welcome';
import Incident from '../components/Incident';
import styles from './Home.css';
import * as HomeActions from '../actions/HomeActions';
import { getSelectedData, getSelectedDate, getBetterDates } from '../selectors';
const moment = require('moment');

class Home extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchPostsIfNeeded();
    actions.updateWelcomeMessage();
  }

  render() {
    const { welcomeMessage, date, actions, selectedData, betterDates } = this.props;
    const closeFn = actions.closeWelcomeMessage;
    const suggestions = selectedData.length !== 0 ? null : (
      <div>
        No incidents happened on {moment(date).format('LL')}, how about trying the following:
          {betterDates.map((x) =>
            <Link key={x} to={`/date/${moment(x).format('YYYY-MM-DD')}`}>
              {moment(x).format('LL')}
            </Link>
          )}
      </div>
    );

    return (
      <main>
        { welcomeMessage !== false ? <Welcome closeFn={closeFn} /> : null }
        <div className={styles['date-label']}>
          <h2>Date of Incidents</h2>
          <DatePicker
            className={styles['date-picker']}
            value={date}
            onChange={(e, d) => actions.mapDateChange(d)}
          />
        </div>
        { suggestions }
        <div className={styles['incident-container']}>
            {selectedData.map((x) =>
              <div key={x.id} className={styles.incident}>
                <Incident incident={x} />
              </div>
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
  date: PropTypes.object.isRequired,
  params: PropTypes.object,
  betterDates: PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
  welcomeMessage: state.welcomeMessage,
  date: getSelectedDate(state, ownProps),
  selectedData: getSelectedData(state, ownProps),
  betterDates: getBetterDates(state, ownProps)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(HomeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
