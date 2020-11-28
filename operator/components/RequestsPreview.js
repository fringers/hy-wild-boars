import React from "react";
import Table from "react-bootstrap/Table";
import Link from "next/link"
import {StatusIcon} from "./StatusIcon";
import {toShortAddress} from "../nominatim/nominatim";

export const RequestsPreview = ({requests, geoInfo}) => {
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
          const geo = geoInfo[row.id];
          console.log(geo)
          return (
            <tr key={row.id}>
              <td className="text-center">
                <StatusIcon status={row.status}/>
              </td>
              <td>
                <Link href={`/requests/${row.id}`}>
                  <a>{row.timestamp.toLocaleString("pl")}</a>
                </Link>
              </td>
              <td>
                {
                  row.photoUrl
                    ? (
                      <a href={row.photoUrl} target="_blank">
                        <img src={row.photoUrl} style={{maxWidth: 60, maxHeight: 60}} alt=""/>
                      </a>
                    )
                    : ""
                }
              </td>
              <td>
                <Link href={`/requests/${row.id}`}>
                  <a>
                    {
                      geo
                        ? toShortAddress(geo)
                        : 'Zobacz na mapie'
                    }
                  </a>
                </Link>
              </td>
              <td>
                {
                  row.isDead
                    ? "Tak"
                    : "Nie"
                }
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
