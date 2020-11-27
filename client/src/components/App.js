import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import { makeStyles } from '@material-ui/core';
import Intro from './Intro';
import SubmitForm from './SubmitForm';
import ThankYou from './ThankYou';

// const useStyles = makeStyles(() => ({
//   container: {
//     backgroundColor: 'red',
//   },
// }));

const App = () => {
  // const classes = useStyles();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Intro} />
        <Route exact path="/submit" component={SubmitForm} />
        <Route exact path="/thankyou" component={ThankYou} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
