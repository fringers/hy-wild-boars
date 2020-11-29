import React from 'react';
import PropTypes from 'prop-types';
import {LayerGroup, MapContainer, Marker, TileLayer} from 'react-leaflet';
import LocationMarker from "./LocationMarker";

import L from "leaflet";

const BoarIcon = L.icon({
  iconUrl: '/wild-boar.svg',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const Map = ({ requests, position, waiting, setPosition }) => (
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

    <LayerGroup>
      {
        requests?.map(r => {
          return (
            <Marker
              key={r.id}
              position={[r.location.latitude, r.location.longitude]}
              icon={BoarIcon}
            />
          )
        })}
    </LayerGroup>
  </MapContainer>
);

Map.propTypes = {
  position: PropTypes.object.isRequired,
};

export default Map;
