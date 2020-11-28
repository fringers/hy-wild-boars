import React from "react";
import Table from "react-bootstrap/Table";
import Link from "next/link"
import {StatusIcon} from "./StatusIcon";
import {toShortAddress} from "../nominatim/nominatim";
import {useRouter} from "next/router";

export const RequestsPreview = ({requests, geoInfo}) => {
  const router = useRouter()

  const openDetails = (id) => {
    router.push(`/requests/${id}`)
  }

  return (
    <Table striped hover responsive className="clickable">
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

          return (
            <tr key={row.id} onClick={e => openDetails(row.id)}>
              <td className="text-center">
                <StatusIcon status={row.status}/>
              </td>
              <td>
                {row.timestamp.toLocaleString("pl")}
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
                {
                  geo
                    ? toShortAddress(geo)
                    : 'Zobacz na mapie'
                }
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
