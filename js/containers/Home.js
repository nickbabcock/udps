import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Welcome from '../components/Welcome';
import Incident from '../components/Incident';
import BetterDate from '../components/BetterDate';
import styles from './Home.css';
import * as HomeActions from '../actions/HomeActions';
import { getSelectedData, getSelectedDate, getBetterDates } from '../selectors';

class Home extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchPostsIfNeeded();
    actions.updateWelcomeMessage();
  }

  render() {
    const { welcomeMessage, date, actions, selectedData, betterDates } = this.props;
    const closeFn = actions.closeWelcomeMessage;
    return (
      <main>
        {welcomeMessage !== false ? <Welcome closeFn={closeFn} /> : null}
        <div className={styles['date-label']}>
          <h2>Date of Incidents</h2>
          <DatePicker
            className={styles['date-picker']}
            value={date.toDate()}
            onChange={(e, d) => actions.mapDateChange(d)}
          />
        </div>
        {selectedData.length !== 0 ? null : <BetterDate date={date} betterDates={betterDates} />}
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
