import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

const AppBar = ({ showNotifications }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6">Dzik Alert</Typography>
        <div className={classes.grow} />
        {showNotifications && (
          <IconButton
            onClick={() => history.push('/notifications')}
            color="inherit"
          >
            <MailIcon />
          </IconButton>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

AppBar.propTypes = {
  showNotifications: PropTypes.bool,
};

export default AppBar;
