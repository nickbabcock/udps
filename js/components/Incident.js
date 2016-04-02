import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Incident.css';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

const Incident = ({ incident }) => (
  <ReactCSSTransitionGroup
    transitionName={styles}
    transitionAppear
    transitionAppearTimeout={500}
  >
      <GridTile
        key={incident.id}
        title={incident.description}
        subtitle={incident.address}
      >
      <div className={styles.incident} />
    </GridTile>
  </ReactCSSTransitionGroup>
);

Incident.propTypes = {
  incident: PropTypes.object.isRequired
};

export default Incident;
