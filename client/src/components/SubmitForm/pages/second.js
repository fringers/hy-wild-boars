import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import { uploadFile } from '../../../firebase/storage';

const SecondForm = ({ onNext, classes }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <FontAwesomeIcon className={classes.icon} icon={faCamera} />
      <Typography variant="h2">Zrób zdjęcie</Typography>
      <Typography variant="subtitle1">Bo się nam przyda</Typography>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="button-file"
        multiple
        type="file"
        onChange={async (e) => {
          const filePath = e?.target?.value;
          if (filePath) {
            setLoading(true);
            const fileUrl = await uploadFile(filePath);
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
    </>
  );
};

SecondForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default SecondForm;
