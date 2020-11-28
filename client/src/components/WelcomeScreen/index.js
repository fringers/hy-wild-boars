import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Zoom } from '@material-ui/core';
import useStyles from './styles';

const WelcomeScreen = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.push('/home'), 3000);
  }, []);

  return (
    <div className={classes.container}>
      <img className={classes.img} src="/app_logo.png" />
      <div className={classes.title}>
        <Zoom in style={{ transitionDelay: '500ms' }}>
          <Typography variant="h5">Dzik</Typography>
        </Zoom>
        <Zoom in style={{ transitionDelay: '1000ms' }}>
          <Typography variant="h2">Alert</Typography>
        </Zoom>
      </div>
    </div>
  );
};

export default WelcomeScreen;
