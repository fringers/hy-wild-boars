import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Button, Paper } from '@material-ui/core';

const Intro = () => {
  const history = useHistory();
  const [page, setPage] = useState(0);

  return (
    <Carousel
      index={page}
      autoPlay={false}
      indicators={true}
      timeout={600}
      onChange={(index, active) => {
        console.log({ index, active });
        setPage(index);
      }}
      animation="slide"
      navButtonsAlwaysInvisible
    >
      <Paper>
        <h2>Test1</h2>
        <p>Description1</p>
        <Button onClick={() => setPage(page + 1)}>Dalej</Button>
      </Paper>
      <Paper>
        <h2>Test2</h2>
        <p>Description2</p>
        <Button onClick={() => setPage(page - 1)}>Wstecz</Button>
        <Button onClick={() => setPage(page + 1)}>Dalej</Button>
      </Paper>
      <Paper>
        <h2>Test3</h2>
        <p>Description3</p>
        <Button onClick={() => setPage(page - 1)}>Wstecz</Button>
        <Button onClick={() => history.push('/submit')}>Dalej</Button>
      </Paper>
    </Carousel>
  );
};

export default Intro;
