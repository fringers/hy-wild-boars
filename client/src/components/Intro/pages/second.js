import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';

const SecondIntro = ({ onNext, onPrev, classes }) => (
  <>
    <FontAwesomeIcon className={classes.icon} icon={faShoePrints} />
    <Typography variant="h2">Powoli się wycofaj</Typography>
    <Typography variant="subtitle1">
      Staraj się możliwie najspokojniej wycofać, nie robiąc wokół siebie hałasu.
      Dziki są mało zwrotne, więc to powinno dać ci chwilę wytchnienia. Zwierzę
      będzie musiało zahamować i potem nawrócić, a ty wykorzystasz ten czas,
      żeby odejść możliwie najdalej
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

SecondIntro.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default SecondIntro;
