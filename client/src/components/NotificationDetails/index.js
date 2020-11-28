import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Zoom, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
  grow: {},
}));

const NotificationDetails = () => {
  const classes = useStyles();
  const history = useHistory();

  const newNotifications = 2;

  return <p>NotificationDetails</p>;
};

export default NotificationDetails;
