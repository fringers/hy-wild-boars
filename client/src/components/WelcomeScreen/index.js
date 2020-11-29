import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Zoom } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';

import useStyles from './styles';

const WelcomeScreen = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.push('/home'), 4000);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <img className={classes.img} src="/app_logo.png" />
        <div className={classes.footprints}>
          <Zoom in style={{ transitionDelay: '1500ms' }}>
            <FontAwesomeIcon className={classes.step1} icon={faShoePrints} />
          </Zoom>
          <Zoom in style={{ transitionDelay: '2000ms' }}>
            <FontAwesomeIcon className={classes.step2} icon={faShoePrints} />
          </Zoom>
          <Zoom in style={{ transitionDelay: '2500ms' }}>
            <FontAwesomeIcon className={classes.step3} icon={faShoePrints} />
          </Zoom>
          <Zoom in style={{ transitionDelay: '3000ms' }}>
            <FontAwesomeIcon className={classes.step4} icon={faShoePrints} />
          </Zoom>
        </div>
      </div>
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
