import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';

import { sendRequest } from '../../firebase/db';
import IsDead from './pages/IsDead';
import DontTouch from './pages/DontTouch';
import KeepCalm from './pages/KeepCalm';
import HowMany from './pages/HowMany';

import Location from './pages/Location';
import Photo from './pages/Photo';

import AdditionalInfo from './pages/AdditionalInfo';
import useStyles from './styles';

const Page = {
  isDead: 0,
  dontTouch: 1,
  keepCalm: 2,
  howMany: 3,
  photo: 4,
  location: 5,
  additionalInfo: 6,
};

const SubmitForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [isDead, setDead] = useState(null);
  const [howMany, setHowMany] = useState('');

  const [position, setPosition] = useState({});
  const [fileUrl, setFileUrl] = useState('');

  console.log({ position, fileUrl, isDead });

  return (
    <Carousel
      className={classes.carousel}
      index={page}
      autoPlay={false}
      indicators={false}
      onChange={(index) => setPage(index)}
      navButtonsAlwaysInvisible
    >
      <IsDead
        classes={classes}
        onNext={(_isDead) => {
          setDead(_isDead);
          if (_isDead) setPage(Page.dontTouch);
          else setPage(Page.keepCalm);
        }}
      />
      <DontTouch
        classes={classes}
        onPrev={() => setPage(Page.isDead)}
        onNext={() => setPage(Page.howMany)}
      />
      <KeepCalm
        classes={classes}
        onPrev={() => setPage(Page.isDead)}
        onNext={() => setPage(Page.howMany)}
      />
      <HowMany
        classes={classes}
        onNext={(value) => {
          setHowMany(value);
          setPage(Page.photo);
        }}
      />
      <Photo
        isDead={isDead}
        classes={classes}
        onNext={(fileUrl) => {
          setFileUrl(fileUrl);
          setPage(Page.location);
        }}
      />
      <Location
        classes={classes}
        onNext={(position) => {
          setPosition(position);
          setPage(Page.additionalInfo);
        }}
      />
      <AdditionalInfo
        classes={classes}
        onNext={async (details) => {
          // TODO: add error handling, check if offline
          // TODO: add howMany
          await sendRequest(fileUrl, position, isDead, details);
          history.push('/thankyou');
        }}
      />
    </Carousel>
  );
};

export default SubmitForm;
