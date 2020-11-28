import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const ThankYou = () => {
  const history = useHistory();

  return (
    <div>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <Button onClick={() => history.push('/home')}>Wróć</Button>
    </div>
  );
};

export default ThankYou;
