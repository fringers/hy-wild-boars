import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dynamic from "next/dynamic";
import {RequestsPreview} from "./RequestsPreview";

const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false
});

export const Dashboard = () => {
  return (
    <Container fluid>
      <Row className="mt-3">
        <Col sm={12} xl={6}>
          <RequestsPreview/>
        </Col>
        <Col sm={12} xl={6}>
          <MapWithNoSSR/>
        </Col>
      </Row>
    </Container>
  )
}
