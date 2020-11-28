import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { getPosition } from '../../../libs/location';

const Location = ({ isDead, onNext, onSkip, classes }) => {
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    setLoading(true);
    const position = await getPosition();
    setLoading(false);
    onNext(position);
  };

  return (
    <Paper classes={{ root: classes.paper }}>
      <FontAwesomeIcon className={classes.icon} icon={faMapMarkerAlt} />
      <div className={classes.infoContainer}>
        <Typography variant="h2">Wskaż localizajcę</Typography>
        <Typography variant="subtitle1">
          {isDead
            ? 'Wyślemy odpowiednią osobę która wszystkim się zajmie.'
            : 'Jest nam potrzebna aby sprawnie śledzić dziki.'}
        </Typography>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetLocation}
          disabled={loading}
        >
          Pobierz automatycznie
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSkip}
          disabled={loading}
        >
          Wskaż ręcznie
        </Button>
      </div>
    </Paper>
  );
};

Location.propTypes = {
  isDead: PropTypes.bool,
  onSkip: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Location;
