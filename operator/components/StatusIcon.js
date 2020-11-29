import React from "react";

const Icon = ({bgColor, shadowColor}) => {
  return <div style={{
    display: 'inline-block',
    width: '12px',
    height: '12px',
    backgroundColor: bgColor,
    boxShadow: `1px 1px 8px 0 ${shadowColor}`,
    borderRadius: '100%',
  }}/>
}

export const StatusIcon = ({status}) => {
  switch (status) {
    case 'NEW':
      return <Icon bgColor="red" shadowColor="rgb(255,0,0,0.75)"/>
    case 'ACCEPTED':
      return <Icon bgColor="orange" shadowColor="rgb(255,69,0,0.75)"/>
    case 'RESOLVED':
      return <Icon bgColor="green" shadowColor="rgb(0,0,0,0.75)"/>
    case 'REJECTED':
      return <Icon bgColor="gray" shadowColor="rgb(0,0,0,0.75)"/>
    default:
      return null
  }
}