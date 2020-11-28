import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  addRequestMessage,
  getRequestById,
  getRequestMessages, updateRequestStatus
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan} from '@fortawesome/free-solid-svg-icons';
import {IconButton } from "@material-ui/core";

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

  const fetchRequest = async (id) => {
    const response = await getRequestById(id);
    setRequest(response);
  }

  const fetchMessages = async (id) => {
    const messagesResponse = await getRequestMessages(id);
    setRequestMessages(messagesResponse)
  }

  useEffect(() => {
    fetchRequest(id);
    fetchMessages(id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true)

    if (message && message.length > 0) {
      try {
        await addRequestMessage(id, message)
        await fetchMessages(id);

        setMessage('')
      } catch (e) {
        console.error(e)
      }
    }

    setLoading(false)
  };

  const handleRequestCancel = async () => {
    setLoading(true)
    try {
      await updateRequestStatus(id, 'REJECTED')
      await fetchRequest(id);
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

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
          {
            (request.status === "NEW") ? (
              <ListItemIcon>
                <IconButton onClick={handleRequestCancel} disabled={loading}>
                  <FontAwesomeIcon icon={faBan} />
                </IconButton >
              </ListItemIcon>
            ) : ''
          }

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
