import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  addRequestMessage,
  getRequestById,
  getRequestMessages
} from '../../firebase/db';
import AppBar from '../AppBar';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import StatusIcon from "../NotificationsScreen/StatusIcon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const getDate = (timestamp) => {
  const tmp = Date.parse(timestamp);
  return new Date(tmp).toLocaleString();
};

const statusToText = (status) => {
  switch (status) {
    case 'NEW':
      return "Zgłoszenie wysłane"
    case 'ACCEPTED':
      return "Zgłoszenie zaakceptowane"
    case 'REJECTED':
      return "Odrzucone"
    case 'RESOLVED':
      return "Zgłoszenie rozwiązane"
    default:
      return "Nieznany status"
  }
}

const msgSenderToText = (sender) => {
  switch (sender) {
    case 'OPERATOR':
      return "Operator"
    case 'USER':
      return "Ty"
    default:
      return ""
  }
}

const NotificationDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const [requestMessages, setRequestMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(async () => {
    const response = await getRequestById(id);
    setRequest(response);

    const messagesResponse = await getRequestMessages(id);
    setRequestMessages(messagesResponse)
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true)

    if (message && message.length > 0) {
      try {
        await addRequestMessage(id, message)
        const messagesResponse = await getRequestMessages(id);
        setRequestMessages(messagesResponse)

        setMessage('')
      } catch (e) {
        console.error(e)
      }
    }

    setLoading(false)
  };

  return (
    <>
      <AppBar />
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={request.photoUrl}/>
          </ListItemAvatar>
          <ListItemText
            primary={`${getDate(request.timestamp)}`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <StatusIcon status={request.status} />
          </ListItemIcon>
          <ListItemText
            primary={`${statusToText(request.status)}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={request.isDead ? "Martwy" : "Żywy"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={request.details}
          />
        </ListItem>
      </List>

      <List>
        <ListSubheader>
          Wiadomości:
        </ListSubheader>
        {requestMessages?.map(({ id, text, sender, timestamp }, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={text}
              secondary={`${msgSenderToText(sender)}, ${getDate(timestamp)}`}
            />
          </ListItem>
        ))}
        <ListItem>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="Wyślij wiadomość..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              disabled={loading}
            />
          </form>
        </ListItem>
      </List>


    </>
  );
};

export default NotificationDetails;
