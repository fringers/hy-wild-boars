import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { getPosition } from '../../../libs/location';

const Location = ({ onNext, classes }) => {
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
        <Typography variant="h2">Daj nam lokalizację</Typography>
        <Typography variant="subtitle1">
          Abyśmy mogli sprawnie cię śledzić
        </Typography>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGetLocation}
        disabled={loading}
      >
        Pobierz lokalizację
      </Button>
    </Paper>
  );
};

Location.propTypes = {
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Location;
