import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
import { Snackbar, makeStyles } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { onAuthStateChanged } from '../firebase/auth';
import { sendRequest } from '../firebase/db';
import { uploadFile } from '../firebase/storage';

import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import SubmitForm from './SubmitForm';
import ThankYou from './ThankYou';
import NotificationsScreen from './NotificationsScreen';
import NotificationDetails from './NotificationDetails';

const useStyles = makeStyles(() => ({
  switchWrapper: {
    position: 'relative',
    '& > div': {
      width: '100%',
      position: 'absolute',
    },
  },
  snackbar: {
    bottom: 80,
  },
}));

const theme = () =>
  createMuiTheme({
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

const offlineTheme = () =>
  createMuiTheme({
    palette: {
      primary: {
        main: '#808080',
        light: '#F5F5F5',
        dark: '#303030',
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
  const [online, setOnline] = useState(window.navigator.onLine);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleNetworkChange = () => {
    setOnline(window.navigator.onLine);
    setOpenSnackbar(true);

    let myCache = window.myCache;
    if (myCache.length) {
      setUploading(true);
      myCache.forEach(
        async ({
          fileUrl,
          fileForLater,
          position,
          isDead,
          howMany,
          details,
        }) => {
          let fUrl = fileUrl;
          if (fileForLater) {
            fUrl = await uploadFile(fileForLater);
          }
          await sendRequest(fUrl, position, isDead, howMany, details);
        }
      );
      setUploading(false);
    }
  };

  useEffect(() => {
    if (typeof window.myCache !== Array) {
      window.myCache = [];
    }

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    onAuthStateChanged(setUser);
    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={online ? theme() : offlineTheme()}>
        <Snackbar
          classes={{ root: classes.snackbar }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={online ? 'Odzyskano połączenie!' : 'Jesteś offline'}
        />
        <Snackbar
          classes={{ root: classes.snackbar }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={uploading}
          message="Wysyłanie zaległył zgłoszeń..."
        />
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
              component={WelcomeScreen}
            />
            <AnimatedRoute
              atEnter={{ offset: -100 }}
              atLeave={{ offset: -100 }}
              atActive={{ offset: 0 }}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`,
              })}
              exact
              path="/home"
              component={HomeScreen}
            />
            <AnimatedRoute
              atEnter={{ offset: -100 }}
              atLeave={{ offset: -100 }}
              atActive={{ offset: 0 }}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`,
              })}
              exact
              path="/notifications"
              component={NotificationsScreen}
            />
            <AnimatedRoute
              atEnter={{ offset: -100 }}
              atLeave={{ offset: -100 }}
              atActive={{ offset: 0 }}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`,
              })}
              exact
              path="/notifications/:id"
              component={NotificationDetails}
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
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
