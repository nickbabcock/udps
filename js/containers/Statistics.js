import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Line as LineChart } from 'react-chartjs';
import * as HomeActions from '../actions/HomeActions';
import { getMonthlyData } from '../selectors';

class Statistics extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchPostsIfNeeded();
  }

  render() {
    const { data } = this.props;
    const chartData = {
      labels: data.map(([mon]) => mon),
      datasets: [{
        label: '# of Incidents',
        data: data.map(([, val]) => val.length)
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    return (
      <div>
        <h2>Statistics</h2>
        <LineChart options={options} data={chartData} width={"250"} />
        <p>This page is under construction!</p>
      </div>
    );
  }
}

Statistics.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  data: getMonthlyData(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(HomeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
