import Button from "react-bootstrap/Button";
import React from "react";

export const StatusSelector = ({status, children, selectedStatuses, onStatusesChange, className = ''}) => {
  const selected = selectedStatuses.includes(status)
  const onClick = () => {
    const newStatuses = selectedStatuses

    const index = newStatuses.indexOf(status);
    if (selected && index > -1) {
      newStatuses.splice(index, 1);
    } else if (!selected && index === -1) {
      newStatuses.push(status)
    }

    onStatusesChange(newStatuses)
  }

  return (
    <Button variant={selected ? 'primary' : 'link'} onClick={onClick} className={className}>
      {children}
    </Button>
  )
}