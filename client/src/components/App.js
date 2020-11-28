import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
import { makeStyles } from '@material-ui/core';

import Intro from './Intro';
import SubmitForm from './SubmitForm';
import ThankYou from './ThankYou';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#f6f3ee',
    height: '100vh',
    width: '100%',
    margin: 0,
  },
  switchWrapper: {
    position: 'relative',
    '& > div': {
      width: '100%',
      position: 'absolute',
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <BrowserRouter>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className={classes.switchWrapper}
        >
          <AnimatedRoute
            atEnter={{ offset: -100 }}
            atLeave={{ offset: -100 }}
            atActive={{ offset: 0 }}
            mapStyles={(styles) => ({
              transform: `translateX(${styles.offset}%)`,
            })}
            exact
            path="/"
            component={Intro}
          />
          <AnimatedRoute
            atEnter={{ offset: -100 }}
            atLeave={{ offset: -100 }}
            atActive={{ offset: 0 }}
            mapStyles={(styles) => ({
              transform: `translateX(${styles.offset}%)`,
            })}
            exact
            path="/submit"
            component={SubmitForm}
          />
          <AnimatedRoute
            atEnter={{ offset: -100 }}
            atLeave={{ offset: -100 }}
            atActive={{ offset: 0 }}
            mapStyles={(styles) => ({
              transform: `translateX(${styles.offset}%)`,
            })}
            exact
            path="/thankyou"
            component={ThankYou}
          />
        </AnimatedSwitch>
      </BrowserRouter>
    </div>
  );
};

export default App;
