import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';

const FirstForm = ({ onSkip, onNext, classes }) => (
  <>
    <FontAwesomeIcon className={classes.icon} icon={faCommentSlash} />
    <Typography variant="h2">Zachowaj ciszę!</Typography>
    <Typography variant="subtitle1">
      Bądź cicho, Bądź cicho, Bądź cicho
    </Typography>
    <div className={classes.buttonContainer}>
      <Button variant="contained" color="primary" onClick={onSkip}>
        Pomiń
      </Button>
      <Button variant="contained" color="primary" onClick={onNext}>
        Dalej
      </Button>
    </div>
  </>
);

FirstForm.propTypes = {
  onSkip: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default FirstForm;
