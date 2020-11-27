import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {LoginForm} from "../components/LoginForm";
import React from "react";

const login = () => {
  const onLogin = async (email, password) => {
    // TODO
  }

  return (
    <Container>
      <Row>
        <LoginForm onLogin={onLogin}/>
      </Row>
    </Container>
  )
}
export default login
