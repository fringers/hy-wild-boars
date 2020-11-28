import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

const IsDead = ({ onNext, classes }) => (
  <Paper classes={{ root: classes.paper }}>
    <FontAwesomeIcon className={classes.icon} icon={faSkullCrossbones} />
    <Typography variant="h4">Czy dzik jest martwy?</Typography>
    <div className={classes.buttonContainer}>
      <Button variant="contained" size="large" color="primary" onClick={() => onNext(true)}>
        Tak
      </Button>
      <Button variant="contained" size="large" color="primary" onClick={() => onNext(false)}>
        Nie
      </Button>
    </div>
  </Paper>
);

IsDead.propTypes = {
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default IsDead;
