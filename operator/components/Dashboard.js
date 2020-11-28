import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dynamic from "next/dynamic";
import {RequestsPreview} from "./RequestsPreview";
import {StatusSelector} from "./StatusSelector";

const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false
});

export const Dashboard = ({latestRequest, geoInfo, statuses, onStatusesChange}) => {
  return (
    <Container fluid className="mt-3">
      <Row>
        <StatusSelector status="NEW" selectedStatuses={statuses} onStatusesChange={onStatusesChange} className="m-1">
          Nowe
        </StatusSelector>
        <StatusSelector status="ACCEPTED" selectedStatuses={statuses} onStatusesChange={onStatusesChange} className="m-1">
          Zaakceptowane
        </StatusSelector>
        <StatusSelector status="RESOLVED" selectedStatuses={statuses} onStatusesChange={onStatusesChange} className="m-1">
          Rozwiązane
        </StatusSelector>
        <StatusSelector status="REJECTED" selectedStatuses={statuses} onStatusesChange={onStatusesChange} className="m-1">
          Odrzucone
        </StatusSelector>
      </Row>
      <Row className="mt-3">
        <Col sm={12} xl={6}>
          <RequestsPreview requests={latestRequest} geoInfo={geoInfo}/>
        </Col>
        <Col sm={12} xl={6}>
          <MapWithNoSSR requests={latestRequest}/>
        </Col>
      </Row>
    </Container>
  )
}
