import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';

import FirstIntro from './pages/first';
import SecondIntro from './pages/second';
import ThirdIntro from './pages/third';
import useStyles from './styles';

const Intro = () => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);

  return (
    <Carousel
      index={page}
      autoPlay={false}
      indicators={true}
      onChange={(index) => setPage(index)}
      navButtonsAlwaysInvisible
    >
      <Paper classes={{ root: classes.paper }}>
        <FirstIntro
          classes={classes}
          onSkip={() => history.push('/submit')}
          onNext={() => setPage(page + 1)}
        />
      </Paper>
      <Paper classes={{ root: classes.paper }}>
        <SecondIntro
          classes={classes}
          onPrev={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
      </Paper>
      <Paper classes={{ root: classes.paper }}>
        <ThirdIntro
          classes={classes}
          onPrev={() => setPage(page - 1)}
          onNext={() => history.push('./submit')}
        />
      </Paper>
    </Carousel>
  );
};

export default Intro;
