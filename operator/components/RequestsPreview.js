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

      </tbody>
    </Table>
  )
}
