import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export const Layout = ({children}) => {
  return (
    <>
      <Container>
        <Row>
          Auth info
        </Row>
      </Container>

      {children}
    </>
  )
}
