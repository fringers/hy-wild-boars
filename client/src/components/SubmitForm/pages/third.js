import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

const ThirdForm = ({ onNext, classes }) => (
  <>
    <FontAwesomeIcon className={classes.icon} icon={faSkullCrossbones} />
    <Typography variant="h2">Czy dzik jest martwy?</Typography>
    <Typography variant="subtitle1">
      Jeśli żyje to słabo, jeśli nie to lepiej dla ciebie ale to trzeba ogarnąc
      lepiej
    </Typography>
    <div className={classes.buttonContainer}>
      <Button variant="contained" color="primary" onClick={() => onNext(true)}>
        Tak
      </Button>
      <Button variant="contained" color="primary" onClick={() => onNext(false)}>
        Nie
      </Button>
    </div>
  </>
);

ThirdForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default ThirdForm;
