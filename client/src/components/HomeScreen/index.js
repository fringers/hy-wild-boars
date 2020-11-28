import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

import Fab from '@material-ui/core/Fab';
import ReportIcon from '@material-ui/icons/Report';
import AppBar from '../AppBar';
import useStyles from './styles';
import { tips, images } from './data';

const HomeScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const [tip] = useState(tips[Math.floor(Math.random() * tips.length)]);
  const [img] = useState(images[Math.floor(Math.random() * images.length)]);

  return (
    <div className={classes.container}>
      <AppBar showNotifications />
      <div className={classes.wrapper}>
        <div className={classes.imageWrapper}>
          <img
            className={classes.image}
            src={`images/${img}`}
            alt="top image"
          />
        </div>
        <Alert
          classes={{ root: classes.info, standardInfo: classes.standardInfo }}
          severity="info"
        >
          <AlertTitle>Czy wiesz, że...</AlertTitle>
          {tip}
        </Alert>
        <Fab
          classes={{ root: classes.button }}
          variant="extended"
          onClick={() => history.push('/submit')}
        >
          <ReportIcon className={classes.extendedIcon} />
          Zgłoś dzika
        </Fab>
      </div>
    </div>
  );
};

export default HomeScreen;
