import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faViruses } from '@fortawesome/free-solid-svg-icons';

const DontTouch = ({ onNext, classes }) => (
  <Paper classes={{ root: classes.paper }}>
    <FontAwesomeIcon className={classes.icon} icon={faViruses} />
    <div className={classes.infoContainer}>
      <Typography variant="h4">Zachowaj dystans</Typography>
      <Typography variant="subtitle1">
        Nie dotykaj zwłok i nie zbliżaj się do nich. Pamiętaj, że zwierzę mogło
        być chore.
      </Typography>
    </div>
    <div className={classes.buttonContainer}>
      <Button variant="contained" color="primary" onClick={onNext}>
        Dalej
      </Button>
    </div>
  </Paper>
);

DontTouch.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default DontTouch;
