import React from "react";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {RequestMessages} from "./RequestMessages";

const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false
});

export const RequestDetails = ({request, messages, onSendMessage}) => {
  return (
    <Container fluid className="mt-3">
      <Row>
        <Col sm={12} xl={6}>
          <div className="mb-5">
            TU POKAZAć SZCZEGÓłY ZGłOSZENIA
          </div>

          <RequestMessages messages={messages} onSendMessage={onSendMessage}/>
        </Col>
        <Col sm={12} xl={6}>
          <MapWithNoSSR
            requests={[request]}
            center={[request.location.latitude, request.location.longitude]}
            zoom={10}
          />
        </Col>
      </Row>
    </Container>
  )
}