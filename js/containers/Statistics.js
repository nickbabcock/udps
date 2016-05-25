import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Bar as BarChart } from 'react-chartjs';
import * as HomeActions from '../actions/HomeActions';
import { getMonthlyData, getWeeklyData, getHourlyData } from '../selectors';

class Statistics extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchPostsIfNeeded();
  }

  render() {
    const { data, weeklyData, hourlyData } = this.props;
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

    const chartData2 = {
      labels: weeklyData.map(([mon]) => mon),
      datasets: [{
        label: '# of Incidents',
        data: weeklyData.map(([, val]) => val.length)
      }]
    };

    const chartData3 = {
      labels: hourlyData.map(([mon]) => mon),
      datasets: [{
        label: '# of Incidents',
        data: hourlyData.map(([, val]) => val.length)
      }]
    };

    return (
      <div>
        <h2>Statistics</h2>
        <BarChart options={options} data={chartData} width={"250"} />
        <BarChart options={options} data={chartData2} width={"250"} />
        <BarChart options={options} data={chartData3} width={"250"} />
      </div>
    );
  }
}

Statistics.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  weeklyData: PropTypes.array.isRequired,
  hourlyData: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  data: getMonthlyData(state),
  weeklyData: getWeeklyData(state),
  hourlyData: getHourlyData(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(HomeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
