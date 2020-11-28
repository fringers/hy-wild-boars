import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {
  getRequestById,
  updateRequestStatus,
} from '../../firebase/db';
import AppBar from '../AppBar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import StatusIcon from '../NotificationsScreen/StatusIcon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBan} from '@fortawesome/free-solid-svg-icons';
import {IconButton, makeStyles} from '@material-ui/core';
import {Chat} from "./components/Chat";

const useStyles = makeStyles((theme) => ({
  container: {
    height: `${window.innerHeight}px`,
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
  const {id} = useParams();
  const [request, setRequest] = useState({});

  const [loading, setLoading] = useState(false);

  const fetchRequest = async (id) => {
    const response = await getRequestById(id);
    setRequest(response);
  };


  useEffect(() => {
    fetchRequest(id);
  }, []);


  const handleRequestCancel = async () => {
    setLoading(true);
    try {
      await updateRequestStatus(id, 'REJECTED');
      await fetchRequest(id);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className={classes.container}>
      <AppBar/>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={request.photoUrl}/>
          </ListItemAvatar>
          <ListItemText primary={`${getDate(request.timestamp)}`}/>
          {request.status === 'NEW' ? (
            <ListItemIcon>
              <IconButton onClick={handleRequestCancel} disabled={loading}>
                <FontAwesomeIcon icon={faBan}/>
              </IconButton>
            </ListItemIcon>
          ) : (
            ''
          )}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <StatusIcon status={request.status}/>
          </ListItemIcon>
          <ListItemText primary={`${statusToText(request.status)}`}/>
        </ListItem>
        <ListItem>
          <ListItemText primary={request.isDead ? 'Martwy' : 'Żywy'}/>
        </ListItem>
        <ListItem>
          <ListItemText primary={request.details}/>
        </ListItem>
      </List>

      <Chat id={id}/>
    </div>
  );
};

export default NotificationDetails;
