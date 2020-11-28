import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { Typography, Zoom, makeStyles } from '@material-ui/core';

import { getRequests } from '../../firebase/db';

// const useStyles = makeStyles(({ palette, spacing }) => ({
//   grow: {},
// }));

const NotificationsScreen = () => {
  // const classes = useStyles();
  // const history = useHistory();
  const [requests, setRequests] = useState([]);

  console.log({ requests });
  useEffect(async () => {
    const response = await getRequests();
    setRequests(response);
  }, []);

  return (
    <>
      {requests?.map((request, i) => (
        <p key={i}>{JSON.stringify(request)}</p>
      ))}
    </>
  );
};

export default NotificationsScreen;
