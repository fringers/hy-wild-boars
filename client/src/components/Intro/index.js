import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper, makeStyles } from '@material-ui/core';

import FirstIntro from './pages/first';
import SecondIntro from './pages/second';
import ThirdIntro from './pages/third';

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    justifyContent: 'space-between',
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  icon: {
    color: theme.palette.primary.main,
    height: 256,
    fontSize: 156,
  },
  redIcon: {
    color: theme.palette.error.main,
    height: 256,
    fontSize: 156,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
}));

const Intro = () => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);

  return (
    <Carousel
      index={page}
      autoPlay={false}
      indicators={true}
      onChange={(index, active) => {
        console.log({ index, active });
        setPage(index);
      }}
      navButtonsAlwaysInvisible
    >
      <Paper classes={{ root: classes.container }}>
        <FirstIntro
          classes={classes}
          onSkip={() => history.push('/form')}
          onNext={() => setPage(page + 1)}
        />
      </Paper>
      <Paper classes={{ root: classes.container }}>
        <SecondIntro
          classes={classes}
          onPrev={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
      </Paper>
      <Paper classes={{ root: classes.container }}>
        <ThirdIntro
          classes={classes}
          onPrev={() => setPage(page - 1)}
          onNext={() => history.push('./form')}
        />
      </Paper>
    </Carousel>
  );
};

export default Intro;
