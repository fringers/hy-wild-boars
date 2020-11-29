import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from "../../SubmitForm/pages/components/LocationMarker";

const Map = ({ position, waiting, setPosition }) => (
  <MapContainer
    center={position}
    zoom={13}
    scrollWheelZoom={false}
    style={{
      height: '100%',
    }}
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
  position: PropTypes.object.isRequired,
};

export default Map;
