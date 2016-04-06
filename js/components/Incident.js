import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Incident.css';
import Map from './Map';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Paper from 'material-ui/lib/paper';

const Incident = ({ incident }) => (
  <ReactCSSTransitionGroup
    transitionName={styles}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}
    transitionAppear
    transitionAppearTimeout={500}
  >
    <div className={styles.incident}>
      <Paper zDepth={2}>
        <GridTile
          key={incident.id}
          title={incident.description}
          subtitle={incident.address}
        >
          <Map address={incident.address} />
        </GridTile>
      </Paper>
    </div>
  </ReactCSSTransitionGroup>
);

Incident.propTypes = {
  incident: PropTypes.object.isRequired
};

export default Incident;
