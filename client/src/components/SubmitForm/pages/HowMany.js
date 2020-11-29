import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Button,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const HowMany = ({ onNext, classes }) => {
  const [value, setValue] = useState('');
  const [young, setYoung] = useState(false);

  return (
    <Paper classes={{ root: classes.paper }}>
      <FontAwesomeIcon className={classes.icon} icon={faChartLine} />
      <div className={classes.infoContainer}>
        <Typography variant="h4">Ile dzików widzisz?</Typography>
      </div>
      <div className={classes.switchContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="how-many">Liczba dzików</InputLabel>
          <Select
            labelId="how-many"
            value={value}
            onChange={(e) => setValue(e?.target?.value)}
          >
            <MenuItem value="ONE">Jednego</MenuItem>
            <MenuItem value="TWO_TO_SEVEN">Od 2 do 7</MenuItem>
            <MenuItem value="EITGHT_TO_THIRTY">Od 8 do 30</MenuItem>
            <MenuItem value="ABOVE_THIRTY">Powyżej 30</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              classes={{ switchBase: classes.thumb }}
              checked={young}
              onChange={(e) => setYoung(e?.target?.checked)}
              name="isYoung"
              color="secondary"
            />
          }
          label="Są wśród nich młode"
        />
      </div>
      <Button
        disabled={value === ''}
        variant="contained"
        color="primary"
        onClick={() => onNext(value, young)}
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
