import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, TextField, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const AdditionalInfo = ({ online, onNext, classes }) => {
  const [value, setValue] = useState('');

  return (
    <Paper classes={{ root: classes.paper }}>
      <FontAwesomeIcon className={classes.icon} icon={faInfoCircle} />
      <div className={classes.infoContainer}>
        <Typography variant="h4">Twoje uwagi</Typography>
        <Typography variant="subtitle1">
          W tym miejscu możesz wprowadzić inne informacje, które uznasz za
          istotne.
        </Typography>
      </div>
      <TextField
        style={{ width: '100%' }}
        placeholder="Twoje uwagi"
        multiline
        onChange={(e) => setValue(e?.target?.value)}
        value={value}
        rows={4}
        variant="filled"
      />
      {!online && (
        <Typography variant="caption">
          Zgłoszenie zostanie wysłane automatycznie gdy odzyskasz połącznie
          Internetowe.
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={() => onNext(value)}>
        Wyślij
      </Button>
    </Paper>
  );
};

AdditionalInfo.propTypes = {
  online: PropTypes.bool,
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default AdditionalInfo;
