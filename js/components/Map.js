import React, { PropTypes } from 'react';

const Map = ({ address }) => {
  const url = '//maps.googleapis.com/maps/api/staticmap';
  const size = '250x250';
  const src = `${url}?size=${size}&markers=${escape(`|${address}, Ann Arbor, MI`)}`;
  return (
      <img src={src} />
  );
};

Map.propTypes = {
  address: PropTypes.string.isRequired
};

export default Map;
