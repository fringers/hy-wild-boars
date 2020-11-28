import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import {signOut} from "../firebase/auth";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'

export const Layout = ({user, children, title, subTitle}) => {

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
    <div className="d-flex">
      <div style={{minWidth: '300px'}}>
        <Row>
          <Col className="m-3 text-primary">
            <h3>Dzik alarm</h3>
          </Col>
        </Row>
        <Row>
          <Col className="m-3 text-primary">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Link href="/">
                  <a>
                    <FontAwesomeIcon icon={faListAlt}/> Ostatnie zgłoszenia
                  </a>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
      <div className="flex-grow-1">
        <Row className={`bg-primary text-white ${subTitle ? 'py-3 px-4' : 'p-4'}`}>
          <Col>
            <h5 className="m-0">
              {title}
            </h5>
            <span>{subTitle}</span>
          </Col>
          <Col className="text-right">
            {user.email} | <a href="#" className="text-white" onClick={signOut}>Wyloguj</a>
          </Col>
        </Row>

        {children}
      </div>
    </div>
  )
}
