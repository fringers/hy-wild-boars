import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {AnimatedSwitch, AnimatedRoute} from 'react-router-transition';
import {makeStyles} from '@material-ui/core';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import NotificationsScreen from './NotificationsScreen';
import NotificationDetails from './NotificationDetails';

import SubmitForm from './SubmitForm';
import ThankYou from './ThankYou';
import {onAuthStateChanged} from "../firebase/auth";

const useStyles = makeStyles(() => ({
  switchWrapper: {
    position: 'relative',
    '& > div': {
      width: '100%',
      position: 'absolute',
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#bc9c6d',
      light: '#E5DECD',
      dark: '#8a6e41',
    },
    secondary: {
      main: '#503f2b',
      light: '#7d6a54',
      dark: '#271900',
    },
  },
});

export const UserContext = React.createContext(undefined);

const App = () => {
  const classes = useStyles();

  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(setUser), [])

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AnimatedSwitch
            atEnter={{opacity: 0}}
            atLeave={{opacity: 0}}
            atActive={{opacity: 1}}
            className={classes.switchWrapper}
          >
            <AnimatedRoute
              atEnter={{offset: -100}}
              atLeave={{offset: -100}}
              atActive={{offset: 0}}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`,
              })}
              exact
              path="/"
              component={WelcomeScreen}
            />
            <AnimatedRoute
              atEnter={{offset: -100}}
              atLeave={{offset: -100}}
              atActive={{offset: 0}}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`,
              })}
              exact
              path="/home"
              component={HomeScreen}
            />
            <AnimatedRoute
              atEnter={{offset: -100}}
              atLeave={{offset: -100}}
              atActive={{offset: 0}}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`,
              })}
              exact
              path="/notifications"
              component={NotificationsScreen}
            />
            <AnimatedRoute
              atEnter={{offset: -100}}
              atLeave={{offset: -100}}
              atActive={{offset: 0}}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`,
              })}
              exact
              path="/notifications/:id"
              component={NotificationDetails}
            />
            <AnimatedRoute
              atEnter={{offset: -100}}
              atLeave={{offset: -100}}
              atActive={{offset: 0}}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`,
              })}
              exact
              path="/submit"
              component={SubmitForm}
            />
            <AnimatedRoute
              atEnter={{offset: -100}}
              atLeave={{offset: -100}}
              atActive={{offset: 0}}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`,
              })}
              exact
              path="/thankyou"
              component={ThankYou}
            />
          </AnimatedSwitch>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
