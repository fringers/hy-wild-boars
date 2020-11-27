import React from "react";
import Table from "react-bootstrap/Table";

export const RequestsPreview = ({requests}) => {
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Data</th>
          <th>Zdjęcie</th>
          <th>Lokalizacja</th>
          <th>Martwy</th>
          <th>Szczegóły</th>
        </tr>
      </thead>
      <tbody>
      {
        requests.map((row, index) => {
          return (
            <tr key={row.id}>
              <td>{index+1}</td>
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
                {/*<Link href={`/requests/${row.id}`}>*/}
                {/*  <a>Zobacz na mapie</a>*/}
                {/*</Link>*/}
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
