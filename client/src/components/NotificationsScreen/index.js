import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core';

import { getRequests } from '../../firebase/db';
import AppBar from '../AppBar';
import StatusIcon from './StatusIcon';
import {UserContext} from "../App";

const useStyles = makeStyles((theme) => ({
  container: {
    height: `${window.innerHeight}px`,
    backgroundColor: theme.palette.primary.light,
  },
  list: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const getDate = (timestamp) => {
  const tmp = Date.parse(timestamp);
  return new Date(tmp).toLocaleString('PL');
};

const NotificationsScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const [requests, setRequests] = useState([]);

  const user = useContext(UserContext)

  const handleRequestsGet = async () => {
    const response = await getRequests();
    setRequests(response);
  }

  useEffect(() => {
    if (!user)
      return

    handleRequestsGet()
  }, [user?.uid]);

  return (
    <div className={classes.container}>
      <AppBar />
      <List classes={{ root: classes.list }}>
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
              <Avatar src={photoUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={`${getDate(timestamp)}`}
              secondary={`${isDead ? 'martwy' : 'żywy'}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default NotificationsScreen;
