import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { boarsNumberEnumToText } from '../../libs/requestHelper';
import { getRequestById } from '../../firebase/db';
import { UserContext } from '../App';
import StatusIcon from '../NotificationsScreen/StatusIcon';
import AppBar from '../AppBar';
import { Chat } from './components/Chat';
import { RequestMenu } from './components/RequestMenu';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: `${window.innerHeight}px`,
    backgroundColor: theme.palette.primary.light,
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
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
  const [loading, setLoading] = useState(true);

  const fetchRequest = async (id) => {
    setLoading(true);
    const response = await getRequestById(id);
    setRequest(response);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
    if (!user) return;
    fetchRequest(id);
  }, [user?.uid]);

  return (
    <div className={classes.container}>
      <AppBar title="Szczegóły zgłoszenia" />
      {loading && (
        <div className={classes.loadingWrapper}>
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <>
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
          </List>
          <Chat id={id} />
        </>
      )}
    </div>
  );
};

export default NotificationDetails;
