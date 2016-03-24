import React, { Component } from 'react';
import { Gmaps } from 'react-gmaps';

export default class Map extends Component {
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  render() {
    const { coords } = this.props;
    return (
      <Gmaps
        width={'800px'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={12}
        loadingMessage={'Be happy'}
        params={{ v: '3.exp' }}
        onMapCreated={this.onMapCreated} />
    );
  }
}

Map.defaultProps = {
  coords: {
    lat: 51.5258541,
    lng: -0.08040660000006028
  }
};

