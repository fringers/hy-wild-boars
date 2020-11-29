import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

import { getRequests } from '../../firebase/db';
import { UserContext } from '../App';
import AppBar from '../AppBar';
import StatusIcon from './StatusIcon';

const useStyles = makeStyles((theme) => ({
  container: {
    height: `${window.innerHeight}px`,
    backgroundColor: theme.palette.primary.light,
  },
  list: {
    backgroundColor: theme.palette.primary.light,
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  genericIcon: {
    color: theme.palette.primary.dark,
    fontSize: 52,
    marginLeft: -6,
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  avatar: {
    borderRadius: 4,
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
  const [loading, setLoading] = useState(false);

  const user = useContext(UserContext);

  const handleRequestsGet = async () => {
    setLoading(true);
    const response = await getRequests();
    setRequests(response);
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;

    handleRequestsGet();
  }, [user?.uid]);

  return (
    <div className={classes.container}>
      <AppBar title="Twoje zgłoszenia" />
      {loading && (
        <div className={classes.loadingWrapper}>
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <List classes={{ root: classes.list }}>
          {requests?.map(({ id, timestamp, photoUrl, status, isDead }, i) => (
            <ListItem
              button
              key={i}
              onClick={() => history.push(`/notifications/${id}`)}
            >
              <ListItemAvatar>
                {photoUrl ? (
                  <Avatar
                    classes={{ root: classes.avatar }}
                    variant="square"
                    src={photoUrl}
                  />
                ) : (
                  <ImageIcon className={classes.genericIcon} />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={`${getDate(timestamp)}`}
                secondary={`${isDead ? 'martwy' : 'żywy'}`}
              />
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <StatusIcon status={status} />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default NotificationsScreen;
