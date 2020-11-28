import React, { useContext, useEffect, useState } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import { addRequestMessage, watchRequestMessages } from '../../../firebase/db';
import { UserContext } from '../../App';

const msgSenderToText = (sender) => {
  switch (sender) {
    case 'OPERATOR':
      return 'Operator';
    case 'USER':
      return 'Ty';
    default:
      return '';
  }
};

const getDate = (timestamp) => {
  const tmp = Date.parse(timestamp);
  return new Date(tmp).toLocaleString('PL');
};

export const Chat = ({ id }) => {
  const user = useContext(UserContext);

  const [requestMessages, setRequestMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) return;

    return watchRequestMessages(id, setRequestMessages);
  }, [user?.uid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true);

    if (message && message.length > 0) {
      try {
        await addRequestMessage(id, message);
        setMessage('');
      } catch (e) {
        console.error(e);
      }
    }

    setLoading(false);
  };

  return (
    <List>
      <ListSubheader>Wiadomości:</ListSubheader>
      {requestMessages?.map(({ id, text, sender, timestamp }, i) => (
        <ListItem
          key={i}
          style={{ textAlign: sender === 'USER' ? 'right' : 'left' }}
        >
          <ListItemText
            primary={text}
            secondary={`${msgSenderToText(sender)}, ${getDate(timestamp)}`}
          />
        </ListItem>
      ))}
      <ListItem>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ width: '100%' }}
        >
          <TextField
            style={{ width: '100%' }}
            inputStyle={{ width: '100%' }}
            label="Wyślij wiadomość..."
            variant="filled"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={loading}
          />
        </form>
      </ListItem>
    </List>
  );
};
