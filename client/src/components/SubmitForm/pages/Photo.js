import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography, CircularProgress } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Skeleton from '@material-ui/lab/Skeleton';

import { uploadFile } from '../../../firebase/storage';

const Photo = ({ isDead, onNext, classes }) => {
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

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
      {loading && <CircularProgress />}
      {!loading && !photoUrl && (
        <Skeleton variant="rect" width={210} height={118} />
      )}
      {!loading && photoUrl && (
        <img className={classes.photoImg} src={photoUrl} />
      )}
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
        <label htmlFor="button-file">
          <Button
            variant="contained"
            component="span"
            color="primary"
            disabled={loading}
          >
            {photoUrl ? 'Edytuj zdjęcie' : 'Dodaj zdjęcie'}
          </Button>
        </label>
        <Button
          onClick={() => onNext(photoUrl)}
          variant="contained"
          component="span"
          color="primary"
          disabled={loading || !photoUrl}
        >
          Dalej
        </Button>
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
