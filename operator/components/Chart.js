import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Line } from 'react-chartjs-2';
import {Col} from "react-bootstrap";

const roundMinutes = (date) => {
  date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
  date.setMinutes(0, 0, 0);

  return date;
}

function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (hour.length < 2)
    hour = '0' + hour;

  return [year, month, day].join('-') + " " + hour + ":00";
}

export const Chart = ({requests}) => {
  const groupedByHour = {};

  requests.forEach(r => {
    const hour = roundMinutes(r.timestamp)
    if (groupedByHour[hour])
      groupedByHour[hour]++
    else
      groupedByHour[hour] = 1
  })

  const hours = Object.keys(groupedByHour).sort()

  // console.log(hours)

  const datasetData = [];
  const labels = [];
  hours.forEach(h => {
    datasetData.push(groupedByHour[h])
    const date = new Date(h)
    console.log(h)
    labels.push(formatDate(date))
  })


  const data = {
    labels,
    datasets: [{
      label: 'Liczba zgłoszeń',
      data: datasetData,
    }]
  }

  return (
    <Container fluid className="mt-3">
      <Row className="m-3">
        <h5>Liczba zgłoszeń w ostatnich dniach</h5>
      </Row>
      <Row className="pm-4">
        <Col>
          <Line data={data}/>
        </Col>
      </Row>
    </Container>
  )
}
