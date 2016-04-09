import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Incident.css';
import Map from './Map';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Paper from 'material-ui/lib/paper';
import classNames from 'classnames';
const moment = require('moment');

export default class Incident extends Component {
  constructor() {
    super();
    this.state = { showText: false };
  }

  onClick() {
    this.setState({ showText: !this.state.showText });
  }

  render() {
    const { incident } = this.props;
    const { showText } = this.state;
    const cls = showText ? styles.on : styles.off;
    return (
      <ReactCSSTransitionGroup
        transitionName={styles}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div key={incident.id} className={styles.incident}>
          <Paper zDepth={2}>
            <div
              className={classNames(styles.incidentInfo, cls, styles.transition)}
              onClick={() => this.onClick()}
            >
              <p>{`id: ${incident.id}`}</p>
              <p>{`date: ${moment(incident.date).format('llll')}`}</p>
              <p>{`address: ${incident.address}`}</p>
              <p>{`description: ${incident.narrative}`}</p>
            </div>
            <GridTile
              key={incident.id}
              title={incident.description}
              subtitle={incident.address}
              onClick={() => this.onClick()}
            >
              <Map address={incident.address} />
            </GridTile>
          </Paper>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

Incident.propTypes = {
  incident: PropTypes.object.isRequired
};
