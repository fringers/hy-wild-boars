import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Marker, useMapEvents } from 'react-leaflet';

const MarkerIcon = L.icon({
  iconUrl: '/circle-solid.svg',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const LocationMarker = ({ waiting, position, setPosition }) => {
  const markerRef = useRef(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, [waiting]);

  return (
    <Marker
      position={position}
      icon={MarkerIcon}
      ref={markerRef}
    />
  );
};

LocationMarker.propTypes = {
  waiting: PropTypes.bool,
  position: PropTypes.object.isRequired,
};

export default LocationMarker;
