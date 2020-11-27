import React, {useState} from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import {useRouter} from "next/router";

export const LoginForm = ({onLogin}) => {
  const router = useRouter()

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true)

    const form = event.currentTarget;
    if (form.checkValidity()) {
      try {
        await onLogin(email, password)
        await router.push("/")
      } catch (e) {
        console.error(e)
      }
    }

    setValidated(true);
    setLoading(false)
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        Login
      </Button>
    </Form>
  )
}
