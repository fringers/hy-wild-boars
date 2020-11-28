import React from "react";
import Table from "react-bootstrap/Table";
import {StatusIcon} from "./StatusIcon";
import {toShortAddress} from "../nominatim/nominatim";
import {useRouter} from "next/router";
import {boarsNumberEnumToText} from "../../client/src/libs/requestHelper";

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
        <th>Lokalizacja</th>
        <th>Martwy</th>
        <th>Liczba</th>
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
              <td>
                {boarsNumberEnumToText(row.howMany)}
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </Table>
  )
}
