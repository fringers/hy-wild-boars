import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSatelliteDish, faTree, faBan, faCheck } from '@fortawesome/free-solid-svg-icons'

export const StatusIcon = ({status}) => {
  switch (status) {
    case 'NEW':
      return <FontAwesomeIcon icon={faSatelliteDish}/>
    case 'ACCEPTED':
      return <FontAwesomeIcon icon={faTree}/>
    case 'REJECTED':
      return <FontAwesomeIcon icon={faBan}/>
    case 'RESOLVED':
      return <FontAwesomeIcon icon={faCheck}/>
    default:
      return null
  }
}