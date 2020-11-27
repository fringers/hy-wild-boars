import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSatelliteDish, faTree, faBan, faCheck } from '@fortawesome/free-solid-svg-icons'

export const StatusIcon = ({status}) => {
  switch (status) {
    case 'NEW':
      return <FontAwesomeIcon icon={faSatelliteDish} title="Nowe zgłoszenie"/>
    case 'ACCEPTED':
      return <FontAwesomeIcon icon={faTree} title="Zaakceptowano - przetwarzanie"/>
    case 'REJECTED':
      return <FontAwesomeIcon icon={faBan} title="Odrzucone"/>
    case 'RESOLVED':
      return <FontAwesomeIcon icon={faCheck} title="Zgłoszenie rozwiązane"/>
    default:
      return null
  }
}