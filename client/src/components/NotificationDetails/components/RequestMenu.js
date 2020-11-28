import React, { useState } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { updateRequestStatus } from '../../../firebase/db';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export const RequestMenu = ({ request, onCancelled }) => {
  if (!request || request.status !== 'NEW') return null;

  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRequestCancel = async () => {
    setLoading(true);
    try {
      await updateRequestStatus(request.id, 'REJECTED');
      await onCancelled(request.id);
      setAnchorEl(null);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <ListItemIcon>
      <IconButton
        aria-controls="request-menu"
        aria-haspopup="true"
        onClick={handleClick}
        disabled={loading}
      >
        <FontAwesomeIcon icon={faEllipsisH} />
      </IconButton>
      <Menu
        id="request-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleRequestCancel}>Anuluj</MenuItem>
      </Menu>
    </ListItemIcon>
  );
};
