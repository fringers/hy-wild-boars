import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Zoom, makeStyles } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(({ palette, spacing }) => ({
  grow: {
    flexGrow: 1,
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const history = useHistory();

  const newNotifications = 2;

  return (
    <div className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dzik Alert</Typography>
          <div className={classes.grow} />
          <IconButton
            onClick={() => history.push('/notifications')}
            aria-label={`show ${newNotifications} new notifications`}
            color="inherit"
          >
            <Badge badgeContent={newNotifications} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HomeScreen;
