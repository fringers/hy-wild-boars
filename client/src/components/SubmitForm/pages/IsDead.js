import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

const IsDead = ({ onNext, classes }) => (
  <Paper classes={{ root: classes.paper }}>
    <FontAwesomeIcon className={classes.icon} icon={faSkullCrossbones} />
    <Typography variant="h2">Czy dzik jest martwy?</Typography>
    <div className={classes.buttonContainer}>
      <Button variant="contained" size="large" color="primary" onClick={() => onNext(true)}>
        Tak
      </Button>
      <Button variant="contained" size="large" color="primary" onClick={() => onNext(false)}>
        Nie
      </Button>
    </div>
  </Paper>
);

IsDead.propTypes = {
  onNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default IsDead;

/**
 *

Zachowaj bezpieczną odległość i nie prowokuj zwierzęcia, staraj się udawać drzewo, powoli się wycofując.
Jeśli widzisz lochę z młodymi, zostaw je w spokoju – locha będzie bardziej niebezpieczna ponieważ będzie chronić swoje młode.
Jeżeli dzik szykuje się do ataku, spróbuj wspiąć się na najbliższe drzewo lub samochód (wys. min 2 m). Uciekając często zmieniaj kierunek, dziki słabo radzą sobie w manewrowaniu.
 *
 */
