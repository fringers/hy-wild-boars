import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';

import { sendRequest } from '../../firebase/db';
import FirstForm from './pages/first';
import SecondForm from './pages/second';
import ThirdForm from './pages/third';
import FourthForm from './pages/fourth';
import useStyles from './styles';

const SubmitForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [position, setPosition] = useState({});
  const [fileUrl, setFileUrl] = useState('');
  const [isDead, setDead] = useState(null);

  console.log({ position, fileUrl, isDead });

  return (
    <Carousel
      index={page}
      autoPlay={false}
      indicators={false}
      onChange={(index) => setPage(index)}
      navButtonsAlwaysInvisible
    >
      <Paper classes={{ root: classes.paper }}>
        <FirstForm
          classes={classes}
          onNext={(position) => {
            setPosition(position);
            setPage(page + 1);
          }}
        />
      </Paper>
      <Paper classes={{ root: classes.paper }}>
        <SecondForm
          classes={classes}
          onNext={(fileUrl) => {
            setFileUrl(fileUrl);
            setPage(page + 1);
          }}
        />
      </Paper>
      <Paper classes={{ root: classes.paper }}>
        <ThirdForm
          classes={classes}
          onNext={(_isDead) => {
            setDead(_isDead);
            setPage(page + 1);
          }}
        />
      </Paper>
      <Paper classes={{ root: classes.paper }}>
        <FourthForm
          classes={classes}
          onNext={async (details) => {
            await sendRequest(fileUrl, position, isDead, details);
            history.push('/thankyou');
          }}
        />
      </Paper>
    </Carousel>
  );
};

export default SubmitForm;
