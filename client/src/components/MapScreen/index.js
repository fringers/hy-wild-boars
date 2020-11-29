import React, {useContext, useEffect, useState} from 'react';

import AppBar from '../AppBar';
import Map from "./components/Map";
import {getPosition} from "../../libs/location";
import {UserContext} from "../App";
import {getAllRecentRequests, getRequests} from "../../firebase/db";

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

  const user = useContext(UserContext);

  const [requests, setRequests] = useState([])
  const handleRequestsGet = async () => {
    const response = await getAllRecentRequests(7);
    setRequests(response);
  };

  useEffect(() => {
    if (!user) return;

    handleRequestsGet();
  }, [user?.uid]);

  return (
    <div style={{
      height: `${window.innerHeight}px`,
    }}>
      <AppBar title="Mapa zgłoszeń"/>
      <div style={{
        height: `calc(${window.innerHeight}px - 56px)`,
      }}>
        <Map
          requests={requests}
          waiting={loading}
          position={position}
          setPosition={setPosition}
        />
      </div>
    </div>
  );
};

export default MapScreen;
