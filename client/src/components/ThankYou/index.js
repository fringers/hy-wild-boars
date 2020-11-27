import React from 'react';
import { Button } from '@material-ui/core';

const ThankYou = () => (
  <div>
    <Button
      onClick={() => {
        console.log('click');
      }}
    >
      THANK YOU PAGE
    </Button>
  </div>
);

export default ThankYou;
