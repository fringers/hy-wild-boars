import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faViruses } from '@fortawesome/free-solid-svg-icons';

const DontTouch = ({ onPrev, onNext, classes }) => (
  <Paper classes={{ root: classes.paper }}>
    <FontAwesomeIcon className={classes.icon} icon={faViruses} />
    <div className={classes.infoContainer}>
      <Typography variant="h2">Nie dotykaj</Typography>
      <Typography variant="subtitle1">Pamiętaj że</Typography>
    </div>
    <div className={classes.buttonContainer}>
      <Button variant="contained" color="primary" onClick={onPrev}>
        Cofnij
      </Button>
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
