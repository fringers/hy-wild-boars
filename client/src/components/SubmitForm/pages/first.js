import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { getPosition } from '../../../libs/location';

const FirstForm = ({ onNext, classes }) => {
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    setLoading(true);
    const position = await getPosition();
    setLoading(false);
    onNext(position);
  };

  return (
    <>
      <FontAwesomeIcon className={classes.icon} icon={faMapMarkerAlt} />
      <Typography variant="h2">Daj nam lokalizację</Typography>
      <Typography variant="subtitle1">
        Abyśmy mogli sprawnie cię śledzić
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGetLocation}
        disabled={loading}
      >
        Pobierz lokalizację
      </Button>
    </>
  );
};

FirstForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default FirstForm;
