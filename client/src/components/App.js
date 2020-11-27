import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { makeStyles } from '@material-ui/core';

import Intro from './Intro';
import SubmitForm from './SubmitForm';
import ThankYou from './ThankYou';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: 'grey',
    height: '100vh',
    width: '100%',
    margin: 0,
  },
  switchWrapper: {
    position: 'relative',
    '> div': {
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
          <Route exact path="/" component={Intro} />
          <Route exact path="/submit" component={SubmitForm} />
          <Route exact path="/thankyou" component={ThankYou} />
        </AnimatedSwitch>
      </BrowserRouter>
    </div>
  );
};

export default App;
