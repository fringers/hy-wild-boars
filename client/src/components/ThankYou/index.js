import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Confetti from 'react-confetti';
import { useHistory } from 'react-router-dom';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: `calc(${window.innerHeight}px - 64px)`,
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  infoContainer: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  icon: {
    animation: `$fadeIn 3000ms ${theme.transitions.easing.easeInOut}`,
    color: theme.palette.primary.dark,
    height: 256,
    fontSize: 156,
    transition: 'width 2s, height 2s, color 3s',
    marginTop: theme.spacing(4),
  },
  iconAnimate: {
    color: '#CCAC00',
    fontSize: 192,
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));

const ThankYou = () => {
  const history = useHistory();
  const classes = useStyles();
  const [recycle, setRecycle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecycle(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Confetti
        recycle={recycle}
        gravity={0.08}
        numberOfPieces={300}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <div className={classes.container}>
        <FontAwesomeIcon
          className={clsx(classes.icon, !recycle && classes.iconAnimate)}
          icon={faMedal}
        />
        <div className={classes.infoContainer}>
          <Typography variant="h4">Dziękujemy za Twoją pomoc!</Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/home')}
        >
          Wróć
        </Button>
      </div>
    </>
  );
};

export default ThankYou;
