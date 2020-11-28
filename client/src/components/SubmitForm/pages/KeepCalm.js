import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

const KeepCalm = ({ onNext, classes }) => (
  <Paper classes={{ root: classes.paper }}>
    <FontAwesomeIcon className={classes.icon} icon={faTree} />
    <div className={classes.infoContainer}>
      <Typography variant="h2">Zachowaj spokój</Typography>
      <Typography variant="subtitle1">
        Zachowaj bezpieczną odległość i nie prowokuj zwierzęcia. Staraj się
        udawać drzewo, powoli się wycofując.
      </Typography>
    </div>
    <div className={classes.buttonContainer}>
      <Button variant="contained" color="primary" onClick={onNext}>
        Dalej
      </Button>
    </div>
  </Paper>
);

KeepCalm.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default KeepCalm;
