import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';

const Map = ({ position, classes }) => (
  <MapContainer
    center={position}
    zoom={13}
    scrollWheelZoom={false}
    className={classes.map}
  >
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

  </MapContainer>
);

Map.propTypes = {
  position: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Map;
