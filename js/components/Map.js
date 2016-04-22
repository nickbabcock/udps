import React, { PropTypes } from 'react';

// Use google static maps api
// https://developers.google.com/maps/documentation/static-maps/intro
// to render incident locations and let google geocode the addresses.
const Map = ({ address }) => {
  const url = '//maps.googleapis.com/maps/api/staticmap';
  const size = '250x250';
  const src = `${url}?size=${size}&markers=${escape(`|${address}, Ann Arbor, MI`)}`;
  return <img src={src} alt={address} />;
};

Map.propTypes = {
  address: PropTypes.string.isRequired
};

export default Map;
