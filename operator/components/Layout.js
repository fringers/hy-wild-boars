import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import {signOut} from "../firebase/auth";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faChartArea } from '@fortawesome/free-solid-svg-icons'

export const Layout = ({user, children, title, subTitle}) => {

  if (!user) {
    return (
      <Container>
        <Row className="text-center p-5 align-content-center justify-content-md-center">
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
          <Col className="mx-3 text-primary-d">
            <div className="d-flex align-content-center align-items-center" onClick={() => window.location = '/'}>
              <img src="/app_logo.png" style={{width: '100px'}}/>
              <h3 className="p-0 m-0">Dzik alert</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="m-3">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Link href="/">
                  <a className="text-primary-d">
                    <FontAwesomeIcon icon={faListAlt}/> Ostatnie zgłoszenia
                  </a>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link href="/charts">
                  <a className="text-primary-d">
                    <FontAwesomeIcon icon={faChartArea}/> Statystyki
                  </a>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
      <div className="flex-grow-1">
        <Col>
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

          {user ? children : ''}
        </Col>
      </div>
    </div>
  )
}
