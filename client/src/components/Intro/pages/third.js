import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper } from '@fortawesome/free-solid-svg-icons';

const ThirdIntro = ({ onNext, onPrev, classes }) => (
  <>
    <FontAwesomeIcon className={classes.icon} icon={faHandPaper} />
    <Typography variant="h2">Nie dotykaj martwego dzika</Typography>
    <Typography variant="subtitle1">
      Może mieć wirusa, nie robi się tak,
    </Typography>
    <div className={classes.buttonContainer}>
      <Button variant="contained" color="primary" onClick={onPrev}>
        Wstecz
      </Button>
      <Button variant="contained" color="primary" onClick={onNext}>
        Dalej
      </Button>
    </div>
  </>
);

ThirdIntro.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default ThirdIntro;
