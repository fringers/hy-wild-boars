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
import {jsPDF} from "jsPDF";

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
          <div className="mb-5">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <RequestActions request={request} onStatusUpdate={onStatusUpdate}/>
                  </div>
                  <div>
                    <Button variant="secondary" onClick={ () => {
                      html2canvas(document.body, {allowTaint: true, useCORS: true}).then(function(canvas) {
                        const doc = jsPDF("l", "mm", [canvas.width, canvas.height]);

                        const imgData = canvas.toDataURL('image/png');
                        doc.addImage(imgData, 'PNG', 0, 0,canvas.width, canvas.height);
                        doc.save('Zgłoszenie-'+request.timestamp.toLocaleString("pl")+'.pdf');

                        // document.body.appendChild(canvas);
                      });
                    }} className="m-1">Wygeneruj PDF</Button>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                Miejsce zgłoszenia: {geoInfo ? geoInfo.display_name : ''}
              </ListGroup.Item>
              <ListGroup.Item>
                Data zgłoszenia: {request.timestamp.toLocaleString("pl")}
              </ListGroup.Item>
              <ListGroup.Item>
                Status: <StatusIcon status={request.status}/> {statusToText(request.status)}

              </ListGroup.Item>
              <ListGroup.Item>
                Martwy dzik: {
                request.isDead
                  ? "Tak"
                  : "Nie"
              }
              </ListGroup.Item>
              <ListGroup.Item>
                Szczegóły: {request.details}
              </ListGroup.Item>
              <ListGroup.Item>
                Zdjęcie: {
                request.photoUrl
                  ? (
                    <a href={request.photoUrl} target="_blank">
                      <img src={request.photoUrl} style={{maxWidth: 128, maxHeight: 128}} alt=""/>
                    </a>
                  )
                  : "Brak"
              }
              </ListGroup.Item>
            </ListGroup>

          </div>

          <div className="mb-2">Rozmowa z użytkownikiem:</div>
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