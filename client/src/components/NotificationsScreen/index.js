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
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

import { getRequests } from '../../firebase/db';
import { UserContext } from '../App';
import AppBar from '../AppBar';
import StatusIcon from './StatusIcon';
import useStyles from './styles';

const HOW_MANY = {
  ONE: 'jeden',
  TWO_TO_SEVEN: 'od 2 do 7',
  EITGHT_TO_THIRTY: 'od 8 do 30',
  ABOVE_THIRTY: 'powyżej 30',
};

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
          {requests?.map(({ id, timestamp, photoUrl, status, howMany }, i) => (
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
                secondary={`Dzików: ${HOW_MANY[howMany]}`}
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
