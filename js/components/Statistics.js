import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Line as LineChart } from 'react-chartjs';
import * as HomeActions from '../actions/HomeActions';
const moment = require('moment');
import { groupBy } from 'lodash';

const months = (data) => {
  console.log(groupBy(data, x => x.date.month()));
  return groupBy(data, x => x.date.month())
}

class Statistics extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchPostsIfNeeded();
  }

  render() {
    const data = {
       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
       datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3]
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
        <LineChart options={options} data={data} width="600" height="250" />
        <p>This page is under construction!</p>
      </div>
    );
  }
}

Statistics.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  data: months(state.data)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(HomeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
