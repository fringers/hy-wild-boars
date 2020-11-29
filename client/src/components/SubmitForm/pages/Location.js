import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';

import { getPosition } from '../../../libs/location';
import Map from './components/Map';

const POSITION = { lat: '52.241', lng: '21.005' };

const Location = ({ onNext, classes }) => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(POSITION);

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
    <Paper classes={{ root: classes.paper }}>
      <Map
        waiting={loading}
        position={position}
        setPosition={setPosition}
        classes={classes}
      />
      <div className={classes.infoContainer}>
        <Typography variant="h4">Wskaż lokalizację</Typography>
        <Typography variant="subtitle1">
          Dokładna lokalizacja pozwoli nam szybciej dotrzeć na miejsce i podjąć
          interwencję.
        </Typography>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onNext(position)}
        disabled={loading}
      >
        Dalej
      </Button>
    </Paper>
  );
};

Location.propTypes = {
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Location;
