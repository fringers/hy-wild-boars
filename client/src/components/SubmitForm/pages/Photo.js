import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import { uploadFile } from '../../../firebase/storage';

const Photo = ({ isDead, onNext, classes }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Paper classes={{ root: classes.paper }}>
      <FontAwesomeIcon className={classes.icon} icon={faCamera} />
      <div className={classes.infoContainer}>
        <Typography variant="h2">Zrób zdjęcie</Typography>
        <Typography variant="subtitle1">
          Jeśli masz możliwośc zrobienia zdjęcia, zrób to.{' '}
          {isDead &&
            'Pamiętaj jednak że Twoje bezpieczeństwo jest najważniejsze!'}
        </Typography>
      </div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="button-file"
        multiple
        type="file"
        onChange={async (e) => {
          const file = e?.target?.files[0];
          if (file) {
            setLoading(true);
            const fileUrl = await uploadFile(file);
            setLoading(false);
            onNext(fileUrl);
          }
        }}
      />
      <label htmlFor="button-file">
        <Button
          variant="contained"
          component="span"
          color="primary"
          disabled={loading}
        >
          Dodaj zdjęcie
        </Button>
      </label>
    </Paper>
  );
};

Photo.propTypes = {
  isDead: PropTypes.bool,
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Photo;
