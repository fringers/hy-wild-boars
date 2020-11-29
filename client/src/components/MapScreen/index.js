import React, {useEffect, useState} from 'react';

import AppBar from '../AppBar';
import Map from "./components/Map";
import {getPosition} from "../../libs/location";

const POSITION = {lat: '52.241', lng: '21.005'};

const MapScreen = () => {
  const [loading, setLoading] = useState(false);
  const [position,  setPosition] = useState(POSITION);

  useEffect(async () => {
    setLoading(true);
    try {
      const position = await getPosition();
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (_) {
      setPosition(POSITION);
      setLoading(false);
    }
    setLoading(false);
  }, []);

  return (
    <div style={{
      height: `${window.innerHeight}px`,
    }}>
      <AppBar title="Mapa zgłoszeń"/>
      <div style={{
        height: `calc(${window.innerHeight}px - 56px)`,
      }}>
        <Map
          waiting={loading}
          position={position}
          setPosition={setPosition}
        />
      </div>
    </div>
  );
};

export default MapScreen;
