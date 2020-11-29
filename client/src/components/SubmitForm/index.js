import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { sendRequest } from '../../firebase/db';
import { uploadFile } from '../../firebase/storage';
import IsDead from './pages/IsDead';
import DontTouch from './pages/DontTouch';
import KeepCalm from './pages/KeepCalm';
import HowMany from './pages/HowMany';
import Location from './pages/Location';
import Photo from './pages/Photo';
import AdditionalInfo from './pages/AdditionalInfo';
import Carousel from './pages/components/Carousel';

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

const isValidIsDeadQuery = (val) => val === 'true' || val === 'false';
const isValidHowManyQuery = (val) =>
  val === 'ONE' ||
  val === 'TWO_TO_SEVEN' ||
  val === 'EITGHT_TO_THIRTY' ||
  val === 'ABOVE_THIRTY';

const SubmitForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [isDead, setDead] = useState(null);
  const [howMany, setHowMany] = useState('');
  const [young, setYoung] = useState('');
  const [position, setPosition] = useState({});
  const [fileUrl, setFileUrl] = useState('');
  const [fileForLater, setFileForLater] = useState('');

  // online/offline support
  const [online, setOnline] = useState(window.navigator.onLine);
  const handleNetworkChange = () => {
    setOnline(window.navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const queryIsDead = params.get('isDead');
    const queryHowMany = params.get('howMany');
    if (isValidIsDeadQuery(queryIsDead) && isValidHowManyQuery(queryHowMany)) {
      setDead(Boolean(queryIsDead));
      setHowMany(queryHowMany);
      setPage(4);
    }
  }, []);

  return (
    <Carousel
      className={classes.carousel}
      index={page}
      autoPlay={false}
      indicators={false}
      onChange={(index) => setPage(index)}
      strictIndexing={false}
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
        onNext={(value, young) => {
          setHowMany(value);
          setYoung(young);
          setPage(Page.photo);
        }}
      />
      <Photo
        online={online}
        isDead={isDead}
        classes={classes}
        onNext={(fileUrl, fileForLater) => {
          if (fileForLater) setFileForLater(fileForLater);
          else setFileUrl(fileUrl);
          setPage(Page.location);
        }}
      />
      <Location
        classes={classes}
        onNext={(position) => {
          setPosition({
            coords: {
              latitude: position.lat,
              longitude: position.lng,
            },
          });
          setPage(Page.additionalInfo);
        }}
      />
      <AdditionalInfo
        online={online}
        classes={classes}
        onNext={async (details) => {
          let fUrl = fileUrl;
          if (online) {
            if (fileForLater) {
              fUrl = await uploadFile(fileForLater);
            }
            await sendRequest(fUrl, position, isDead, howMany, details, young);
          } else {
            window.myCache.push({
              fileUrl,
              fileForLater,
              position,
              isDead,
              howMany,
              details,
              young,
            });
          }
          history.push('/thankyou');
        }}
      />
    </Carousel>
  );
};

export default SubmitForm;
