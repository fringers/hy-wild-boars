import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Paper, Button } from '@material-ui/core';

const POSITION = { lat: '52.241', lng: '21.0058' };

const MarkerIcon = L.icon({
  iconUrl: '/map-marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const ManualLocation = ({ onNext, classes }) => {
  const [userPosition, setUserPostitin] = useState(POSITION);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setUserPostitin(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Paper classes={{ root: classes.paper }}>
      <MapContainer
        center={userPosition}
        zoom={13}
        scrollWheelZoom={false}
        className={classes.map}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={MarkerIcon}
          draggable
          eventHandlers={eventHandlers}
          position={userPosition}
          ref={markerRef}
        />
      </MapContainer>
      <Button
        classes={{ root: classes.mapBtn }}
        variant="contained"
        color="primary"
        onClick={() => onNext(userPosition)}
        disabled={!location}
      >
        Dalej
      </Button>
    </Paper>
  );
};

ManualLocation.propTypes = {
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default ManualLocation;
