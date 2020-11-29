import React from "react";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {RequestMessages} from "./RequestMessages";
import {StatusIcon} from "./StatusIcon";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import * as html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {boarsNumberEnumToText} from "../lib/requestHelper";

const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false
});

const statusToText = (status) => {
  switch (status) {
    case 'NEW':
      return "Nowe zgłoszenie"
    case 'ACCEPTED':
      return "Zaakceptowano - przetwarzanie"
    case 'REJECTED':
      return "Odrzucone"
    case 'RESOLVED':
      return "Zgłoszenie rozwiązane"
    default:
      return "Nieznany"
  }
}

const RequestActions = ({request, onStatusUpdate}) => {
  if (request.status === "NEW") {
    return (
      <>
        <Button onClick={e => onStatusUpdate("ACCEPTED")} className="m-1 text-white">Potwierdź</Button>
        <Button variant="danger" onClick={e => onStatusUpdate("REJECTED")} className="m-1">Odrzuć</Button>
      </>
    )
  }

  if (request.status === "ACCEPTED") {
    return (
      <>
        <Button variant="success" onClick={e => onStatusUpdate("RESOLVED")} className="m-1">Zakończ</Button>
        <Button variant="danger" onClick={e => onStatusUpdate("REJECTED")} className="m-1">Odrzuć</Button>
      </>
    )
  }

  return (
    <>
      <Button variant="warning" onClick={e => onStatusUpdate("NEW")} className="m-1 text-white">Otwórz ponownie</Button>
    </>
  )
}

export const RequestDetails = ({request, messages, geoInfo, onSendMessage, onStatusUpdate}) => {
  return (
    <Container fluid className="mt-3">
      <Row>
        <Col sm={12} xl={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <RequestActions request={request} onStatusUpdate={onStatusUpdate}/>
                </div>
                <div>
                  <Button variant="secondary" onClick={() => {
                    html2canvas(document.body, {allowTaint: true, useCORS: true}).then(function (canvas) {
                      const doc = jsPDF("l", "mm", [canvas.width, canvas.height]);

                      const imgData = canvas.toDataURL('image/png');
                      doc.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                      doc.save('Zgłoszenie-' + request.timestamp.toLocaleString("pl") + '.pdf');

                      // document.body.appendChild(canvas);
                    });
                  }} className="m-1">Wygeneruj PDF</Button>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Miejsce zgłoszenia:</strong> {geoInfo ? geoInfo.display_name : ''}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Data zgłoszenia:</strong> {request.timestamp.toLocaleString("pl")}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Status:</strong> <span className="mx-2"><StatusIcon
              status={request.status}/></span> {statusToText(request.status)}

            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Martwy dzik:</strong> {
              request.isDead
                ? "Tak"
                : "Nie"
            }
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Liczba dzików:</strong> {boarsNumberEnumToText(request.howMany)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Szczegóły:</strong> {request.details}
            </ListGroup.Item>
            <ListGroup.Item>
              {
                request.photoUrl
                  ? (
                    <a href={request.photoUrl} target="_blank">
                      <img src={request.photoUrl} crossOrigin="anonymous" style={{maxWidth: 480, maxHeight: 480}} alt=""/>
                    </a>
                  )
                  : ""
              }
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={12} xl={6}>
          <MapWithNoSSR
            requests={[request]}
            center={[request.location.latitude, request.location.longitude]}
            zoom={10}
          />


          <div className="my-3">Rozmowa z użytkownikiem:</div>
          <RequestMessages messages={messages} onSendMessage={onSendMessage}/>

        </Col>
      </Row>
    </Container>
  )
}