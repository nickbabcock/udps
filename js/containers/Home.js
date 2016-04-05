import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Welcome from '../components/Welcome';
import Incident from '../components/Incident';
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
    const { welcomeMessage, date, actions, selectedData, params } = this.props;
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
              <div className={styles.incident}>
                <Incident key={x.id} incident={x} />
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
  params: PropTypes.object
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
