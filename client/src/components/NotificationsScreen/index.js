import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { getRequests } from '../../firebase/db';
import AppBar from '../AppBar';
import StatusIcon from './StatusIcon';

const getDate = (timestamp) => {
  const tmp = Date.parse(timestamp);
  return new Date(tmp).toLocaleString();
};

const NotificationsScreen = () => {
  const history = useHistory();
  const [requests, setRequests] = useState([]);

  console.log({ requests });
  useEffect(async () => {
    const response = await getRequests();
    setRequests(response);
  }, []);

  return (
    <>
      <AppBar />
      <List>
        {requests?.map(({ id, timestamp, photoUrl, status, isDead }, i) => (
          <ListItem
            button
            key={i}
            onClick={() => history.push(`/notifications/${id}`)}
          >
            <ListItemIcon>
              <StatusIcon status={status} />
            </ListItemIcon>
            <ListItemAvatar>
              <Avatar src={photoUrl}/>
            </ListItemAvatar>
            <ListItemText
              primary={`${getDate(timestamp)}`}
              secondary={`${isDead ? 'martwy' : 'żywy'}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default NotificationsScreen;
