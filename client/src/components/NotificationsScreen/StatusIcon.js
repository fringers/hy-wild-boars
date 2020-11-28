import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'NEW':
      return (
        <FontAwesomeIcon icon={faClock} size="lg" title="Nowe zgłoszenie" />
      );
    case 'ACCEPTED':
      return (
        <FontAwesomeIcon
          icon={faCheckCircle}
          size="lg"
          title="Zaakceptowano - przetwarzanie"
        />
      );
    case 'RESOLVED':
      return (
        <FontAwesomeIcon
          icon={faCheckCircle}
          size="lg"
          title="Zgłoszenie rozwiązane"
        />
      );
    case 'REJECTED':
      return (
        <FontAwesomeIcon icon={faTimesCircle} size="lg" title="Odrzucone" />
      );
    default:
      return null;
  }
};

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusIcon;
