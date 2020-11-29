import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core';

import AppBar from '../AppBar';
import Map from "./components/Map";

const POSITION = {lat: '52.241', lng: '21.005'};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.light,
    height: `${window.innerHeight}px`,
    overflow: "hidden"
  },
  wrapper: {
    height: `calc(${window.innerHeight}px - 56px - 2*24px)`,
    backgroundColor: "red",
    margin: "24px"
  },
  map: {
    height: `100%`,
  },
}));

const MapScreen = () => {
  const classes = useStyles();

  const [position] = useState(POSITION);


  return (
    <div className={classes.container}>
      <AppBar title="Mapa zgłoszeń"/>
      <div className={classes.wrapper}>
        <Map
          position={position}
          classes={classes}
        />
      </div>
    </div>
  );
};

export default MapScreen;
