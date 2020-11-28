import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

const AppBar = ({ title = 'Dzik Alert', showNotifications }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const show = useMediaQuery('(min-width:260px)');

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        {location.pathname !== '/home' ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={(e) => history.goBack()}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </IconButton>
        ) : (
          ''
        )}
        {show && <Typography variant="h6">{title}</Typography>}
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
  title: PropTypes.string,
  showNotifications: PropTypes.bool,
};

export default AppBar;
