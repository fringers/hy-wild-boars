import React from 'react';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

const AppBar = ({showNotifications}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        {location.pathname !== '/home' ?
          <IconButton edge="start" color="inherit" aria-label="back"
                      onClick={e => history.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft}/>
          </IconButton>
          : ""
        }
        <Typography variant="h6">Dzik Alert</Typography>
        <div className={classes.grow}/>
        {showNotifications && (
          <IconButton
            onClick={() => history.push('/notifications')}
            color="inherit"
          >
            <MailIcon/>
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
