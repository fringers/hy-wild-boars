import React from "react";
import Table from "react-bootstrap/Table";
import Link from "next/link"
import {StatusIcon} from "./StatusIcon";

export const RequestsPreview = ({requests}) => {
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Status</th>
          <th>Data</th>
          <th>Zdjęcie</th>
          <th>Lokalizacja</th>
          <th>Martwy</th>
          <th>Szczegóły</th>
        </tr>
      </thead>
      <tbody>
      {
        requests.map(row => {
          return (
            <tr key={row.id}>
              <td>
                <StatusIcon status={row.status}/>
              </td>
              <td>{row.timestamp.toLocaleString("pl")}</td>
              <td>
                {/*{*/}
                {/*  row.photoUrl*/}
                {/*    ? (*/}
                {/*      <a href={row.photoUrl} target="_blank">*/}
                {/*        <img src={row.photoUrl} style={{maxWidth: 60, maxHeight: 60}} alt=""/>*/}
                {/*      </a>*/}
                {/*    )*/}
                {/*    : ""*/}
                {/*}*/}
              </td>
              <td>
                <Link href={`/requests/${row.id}`}>
                  <a>Zobacz na mapie</a>
                </Link>
                {/*row.location*/}
              </td>
              <td>
                {/*{*/}
                {/*  row.isDead*/}
                {/*    ? "Tak"*/}
                {/*    : "Nie"*/}
                {/*}*/}
              </td>
              <td>{row.details}</td>
            </tr>
          )
        })
      }
      </tbody>
    </Table>
  )
}
