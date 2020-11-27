import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import {signOut} from "../firebase/auth";
import Col from "react-bootstrap/Col";

export const Layout = ({user, children}) => {
  const Authorized = ({user}) => <></>
  const Unauthorized = () => <Link href="/login">Logowanie</Link>

  if (!user) {
    return (
      <Container>
        <Row className="text-center m-5 p-5">
          <Link href="/login">
            <a className="block text-center">
              Logowanie
            </a>
          </Link>
        </Row>
      </Container>

    )
  }

  return (
    <>
      <Row className="bg-primary text-white p-4">
        <Col>
          <h5 className="m-0">
            Aktualne zgłoszenia
          </h5>
        </Col>
        <Col className="text-right">
          {user.email} | <a href="#" className="text-white" onClick={signOut}>Logout</a>
        </Col>
      </Row>

      <Container>
        <Row>
          {
            user
              ? <Authorized user={user}/>
              : <Unauthorized/>
          }
        </Row>
      </Container>

      {children}
    </>
  )
}
