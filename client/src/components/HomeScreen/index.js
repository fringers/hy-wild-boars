import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import AppBar from '../AppBar';

const useStyles = makeStyles({
  grow: {},
});

const HomeScreen = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.container}>
      <AppBar showNotifications />
    </div>
  );
};

export default HomeScreen;
