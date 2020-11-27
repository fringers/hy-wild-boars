import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  return (
    <Container fluid>
      <Row className="mt-3">
        <Col sm={12} xl={6}>
          Requests preview
        </Col>
        <Col sm={12} xl={6}>
          Map
        </Col>
      </Row>
    </Container>
  )
}
export default Dashboard
