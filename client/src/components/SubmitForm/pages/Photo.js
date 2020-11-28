import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography, CircularProgress } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { uploadFile } from '../../../firebase/storage';

const showSkerton = (photoUrl, loading) => {
  if (!photoUrl) return true;
  if (loading && photoUrl) return true;
  return false;
};

const Photo = ({ isDead, onNext, classes }) => {
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  return (
    <Paper classes={{ root: classes.paper }}>
      {showSkerton(photoUrl, loading) && (
        <Skeleton variant="rect" width={324} height={256} />
      )}
      {!loading && photoUrl && <img className={classes.icon} src={photoUrl} />}
      <div className={classes.infoContainer}>
        <Typography variant="h2">Zrób zdjęcie</Typography>
        <Typography variant="subtitle1">
          Jeśli masz taką możliwość, zrób zdjęcie. Pomoże nam ono lepiej ocenić
          sytuację.
          {!isDead &&
            ' Pamiętaj jednak, że Twoje bezpieczeństwo jest najważniejsze!'}
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
            const photoUrl = await uploadFile(file);
            setPhotoUrl(photoUrl);
            setLoading(false);
          }
        }}
      />
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => onNext(photoUrl)}
          variant="contained"
          component="span"
          color="primary"
          disabled={loading}
        >
          {photoUrl ? 'Dalej' : 'Pomiń'}
        </Button>
        <label htmlFor="button-file">
          <Button
            variant="contained"
            component="span"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : photoUrl ? (
              'Edytuj zdjęcie'
            ) : (
              'Dodaj zdjęcie'
            )}
          </Button>
        </label>
      </div>
    </Paper>
  );
};

Photo.propTypes = {
  isDead: PropTypes.bool,
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Photo;
