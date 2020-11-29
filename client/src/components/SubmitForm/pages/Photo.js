import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Paper, Button, Typography, CircularProgress } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { uploadFile } from '../../../firebase/storage';

const showSkerton = (photoUrl, loading) => {
  if (!photoUrl) return true;
  if (loading && photoUrl) return true;
  return false;
};

const Photo = ({ online, isDead, onNext, classes }) => {
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [fileForLater, setFileForLater] = useState('');

  return (
    <Paper classes={{ root: classes.paper }}>
      {showSkerton(photoUrl, loading) && (
        <Skeleton variant="rect" width={324} height={256} />
      )}
      {!loading && photoUrl && <img className={classes.icon} src={photoUrl} />}
      <div className={classes.infoContainer}>
        <Typography variant="h4">Zrób zdjęcie</Typography>
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
            setFileForLater('');
            setLoading(true);
            if (online) {
              const photoUrl = await uploadFile(file);
              setPhotoUrl(photoUrl);
            } else setFileForLater(file);
            setLoading(false);
          }
        }}
      />
      <div
        className={clsx(
          classes.buttonContainer,
          !photoUrl && !fileForLater && classes.reverseButtonContainer
        )}
      >
        <label htmlFor="button-file">
          <Button
            variant="contained"
            component="span"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : photoUrl || fileForLater ? (
              'Edytuj zdjęcie'
            ) : (
              'Dodaj zdjęcie'
            )}
          </Button>
        </label>
        <Button
          onClick={() => onNext(photoUrl, fileForLater)}
          variant="contained"
          component="span"
          color="primary"
          disabled={loading}
        >
          {photoUrl || fileForLater ? 'Dalej' : 'Pomiń'}
        </Button>
      </div>
    </Paper>
  );
};

Photo.propTypes = {
  online: PropTypes.bool,
  isDead: PropTypes.bool,
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Photo;
