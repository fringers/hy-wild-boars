import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const SubmitForm = () => {
  const history = useHistory();

  return (
    <div>
      <Button onClick={() => history.push('./thankyou')}>
        go to thank you page
      </Button>
    </div>
  );
};

export default SubmitForm;
