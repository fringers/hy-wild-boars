import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, makeStyles } from '@material-ui/core';

import AppBar from '../AppBar';

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <AppBar showNotifications />
      <div className={classes.container}>
        <Typography variant="subtitle1">Czy wiesz że..</Typography>
      </div>
    </>
  );
};

export default HomeScreen;
