import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const FourthForm = ({ onNext, classes }) => {
  const [value, setValue] = useState('');

  return (
    <>
      <FontAwesomeIcon className={classes.icon} icon={faInfoCircle} />
      <Typography variant="h2">Uwagi</Typography>
      <Typography variant="subtitle1">
        Twoje uwagi są dla nas bardzo ważne, dodać coś żeby się pokazywało
      </Typography>
      <TextField
        placeholder="Twoje uwagi"
        multiline
        onChange={(e) => setValue(e?.target?.value)}
        value={value}
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={() => onNext(value)}>
        Wyślij
      </Button>
    </>
  );
};

FourthForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default FourthForm;
