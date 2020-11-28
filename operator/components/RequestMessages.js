import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

const messageSenderToText = (sender) => {
  switch (sender) {
    case 'USER':
      return "Użytkownik";
    case 'OPERATOR':
      return "Operator";
    default:
      return "";
  }
}

export const RequestMessages = ({messages, onSendMessage}) => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true)

    const form = event.currentTarget;
    if (form.checkValidity()) {
      try {
        await onSendMessage(message)
        setMessage('')
        setValidated(false);
      } catch (e) {
        console.error(e)
      }
    } else {
      setValidated(true);
    }

    setLoading(false)
  };

  return (
    <>
      {
        messages.map(m => {
          return (
            <div>
              {messageSenderToText(m.sender)} {m.timestamp.toLocaleString("pl")}: {m.text}
            </div>
          )
        })
      }
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="message">
          <Form.Control
            type="text"
            placeholder="Wpisz wiadomość"
            value={message}
            onChange={e => setMessage(e.target.value)}
            disabled={loading}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          Wyślij wiadomość
        </Button>
      </Form>
    </>
  )
}
