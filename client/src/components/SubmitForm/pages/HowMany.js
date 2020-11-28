import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, TextField, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const HowMany = ({ onNext, classes }) => {
  const [value, setValue] = useState('');

  return (
    <Paper classes={{ root: classes.paper }}>
      <FontAwesomeIcon className={classes.icon} icon={faChartLine} />
      <div className={classes.infoContainer}>
        <Typography variant="h2">Ile dzików widzisz</Typography>
      </div>
      <TextField
        placeholder="Ile dzików widzisz"
        onChange={(e) => setValue(e?.target?.value)}
        value={value}
      />
      <Button variant="contained" color="primary" onClick={() => onNext(value)}>
        Dalej
      </Button>
    </Paper>
  );
};

HowMany.propTypes = {
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default HowMany;
