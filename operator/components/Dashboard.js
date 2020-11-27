import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false
});

export const Dashboard = () => {
  return (
    <Container fluid>
      <Row className="mt-3">
        <Col sm={12} xl={6}>
          Requests preview
        </Col>
        <Col sm={12} xl={6}>
          <MapWithNoSSR/>
        </Col>
      </Row>
    </Container>
  )
}
