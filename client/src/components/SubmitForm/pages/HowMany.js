import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const HowMany = ({ onNext, classes }) => {
  const [value, setValue] = useState('');

  return (
    <Paper classes={{ root: classes.paper }}>
      <FontAwesomeIcon className={classes.icon} icon={faChartLine} />
      <div className={classes.infoContainer}>
        <Typography variant="h2">Ile dzików widzisz</Typography>
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel id="how-many">Ile dzików</InputLabel>
        <Select
          labelId="how-many"
          value={value}
          onChange={(e) => setValue(e?.target?.value)}
        >
          <MenuItem value="ONE">
            <em>Jednego</em>
          </MenuItem>
          <MenuItem value="TWO_TO_SEVEN">Od 2 do 7</MenuItem>
          <MenuItem value="EITGHT_TO_THIRTY">Od 8 do 30</MenuItem>
          <MenuItem value="ABOVE_THIRTY">Powyżej 30</MenuItem>
        </Select>
      </FormControl>
      <Button
        disabled={value === ''}
        variant="contained"
        color="primary"
        onClick={() => onNext(value)}
      >
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
