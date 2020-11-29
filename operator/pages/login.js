import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {LoginForm} from "../components/LoginForm";
import React from "react";
import {signIn} from "../firebase/auth";

const login = () => {
  const onLogin = async (email, password) => {
    await signIn(email, password)
  }

  return (
    <Container>
      <Row className="p-5 align-content-center justify-content-md-center">
        <LoginForm onLogin={onLogin}/>
      </Row>
    </Container>
  )
}
export default login
