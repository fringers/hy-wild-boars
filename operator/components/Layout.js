import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Link from "next/link";

export const Layout = ({children}) => {
  const Unauthorized = () => <Link href="/login">Logowanie</Link>

  return (
    <>
      <Container>
        <Row>
          <Unauthorized/>
        </Row>
      </Container>

      {children}
    </>
  )
}
