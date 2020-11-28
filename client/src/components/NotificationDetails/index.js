import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { getRequestById } from '../../firebase/db';
import AppBar from '../AppBar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import StatusIcon from '../NotificationsScreen/StatusIcon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core';
import { Chat } from './components/Chat';
import { boarsNumberEnumToText } from '../../libs/requestHelper';
import { UserContext } from '../App';
import { RequestMenu } from './components/RequestMenu';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: `${window.innerHeight}px`,
    backgroundColor: theme.palette.primary.light,
  },
}));

const getDate = (timestamp) => {
  const tmp = Date.parse(timestamp);
  return new Date(tmp).toLocaleString('PL');
};

const statusToText = (status) => {
  switch (status) {
    case 'NEW':
      return 'Zgłoszenie wysłane';
    case 'ACCEPTED':
      return 'Zgłoszenie zaakceptowane';
    case 'REJECTED':
      return 'Odrzucone';
    case 'RESOLVED':
      return 'Zgłoszenie rozwiązane';
    default:
      return 'Nieznany status';
  }
};

const NotificationDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const user = useContext(UserContext);
  const [request, setRequest] = useState({});

  const fetchRequest = async (id) => {
    const response = await getRequestById(id);
    setRequest(response);
  };

  useEffect(() => {
    if (!user) return;
    fetchRequest(id);
  }, [user?.uid]);

  return (
    <div className={classes.container}>
      <AppBar title="Szczegóły zgłoszenia" />
      <List>
        <ListItem>
          <ListItemIcon>
            <StatusIcon status={request.status} />
          </ListItemIcon>
          <ListItemText
            primary={`${statusToText(request.status)}`}
            secondary={`${getDate(request.timestamp)}`}
          />
          <RequestMenu request={request} onCancelled={fetchRequest} />
        </ListItem>
      </List>

      <div>
        <img src={request.photoUrl} style={{ width: '100%' }} />
      </div>

      <List>
        <ListItem>
          <ListItemText
            primary={request.isDead ? 'Martwy' : 'Żywy'}
            secondary={boarsNumberEnumToText(request.howMany)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={request.details} />
        </ListItem>
        <ListItem>
          <ListItemText primary={request.details} />
        </ListItem>
      </List>

      <Chat id={id} />
    </div>
  );
};

export default NotificationDetails;
