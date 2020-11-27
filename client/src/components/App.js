import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Intro} />
          <Route exact path="/submit" component={SubmitForm} />
          <Route exact path="/thankyou" component={ThankYou} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
