import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Incident.css';
import Map from './Map';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

const Incident = ({ incident }) => (
  <ReactCSSTransitionGroup
    transitionName={styles}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}
    transitionAppear
    transitionAppearTimeout={500}
  >
    <div className={styles.incident}>
      <GridTile
        key={incident.id}
        title={incident.description}
        subtitle={incident.address}
      >
        <Map address={incident.address} />
      </GridTile>
    </div>
  </ReactCSSTransitionGroup>
);

Incident.propTypes = {
  incident: PropTypes.object.isRequired
};

export default Incident;
