import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from './LocationMarker';

const Map = ({ waiting, position, setPosition, classes }) => (
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
    <LocationMarker
      waiting={waiting}
      position={position}
      setPosition={setPosition}
    />
  </MapContainer>
);

Map.propTypes = {
  waiting: PropTypes.bool,
  position: PropTypes.object.isRequired,
  setPosition: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Map;
