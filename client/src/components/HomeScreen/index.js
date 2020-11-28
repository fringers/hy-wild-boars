import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import Fab from '@material-ui/core/Fab';
import ReportIcon from '@material-ui/icons/Report';
import AppBar from '../AppBar';

const tips = [
  'Dziki z natury prowadzą nocny tryb życia, jednak przez dokarmianie zmieniają tryb na dzienny.',
  'Młode najczęściej rodzą się w kwietniu.',
  'Waga dzika może wynosić nawet 300 kg.',
  'Zazwyczaj jednak waga waha się w granicach 170 kg (odyńce) oraz 70 kg u lochy.',
  'Warchlaki (czyli młode) do około 4 miesiąca posiadają charakterystyczne paski po bokach. ',
  'Dzik uwielbia tarzać się w błocie i ocierać o drzewa – na skutek czego po jego bokach tworzy się twardy pancerz nazywany usmołem – są to włosy posklejane żywicą i błotem',
  'Dziki żyją w watahach, czyli grupach składających się ze starej lochy, która jest przewodniczą stada, oraz innych samic wraz z warchlakami. Mogą liczyć one nawet 100 osobników.',
  'W przypadku wyczucia zagrożenia locha dźwiękiem sygnalizuje to warchlakom, a te zalegają przy ziemi, przez co trudno je zauważyć.',
  'Dziki potrafią pływać.',
  'Żeby pozbyć się pasożytów ze swego ciała, dziki ocierają się (czochrają) o pnie drzew.',
  'Samica po 16-20 tygodniowej ciąży może urodzić nawet 12 młodych (liczebność młodych rośnie wraz z wiekiem samicy).',
  'Dziki dożywają nawet 40 lat.',
  'Dzik ma bardzo wyczulony węch (w odległości 500 metrów może wyczuć człowieka) oraz wyczulony słuch pozwalający usłyszeć pęknięcie gałązek, trzeszczenie śniegu a nawet szum tarcia ubrań.',
  'Słabością dzika jest wzrok, ponieważ zauważa tylko ruch.',
];

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.light,
    height: `${window.innerHeight}px`,
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  info: {
    width: '95%',
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    position: 'absolute',
    bottom: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  standardInfo: {
    color: 'inherit',
    backgroundColor: 'inherit',
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const tip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className={classes.container}>
      <AppBar showNotifications />
      <div className={classes.wrapper}>
        <Alert
          classes={{ root: classes.info, standardInfo: classes.standardInfo }}
          severity="info"
        >
          <AlertTitle>Czy wiesz, że...</AlertTitle>
          {tip}
        </Alert>
        <Fab
          classes={{ root: classes.button }}
          variant="extended"
          onClick={() => history.push('/submit')}
        >
          <ReportIcon className={classes.extendedIcon} />
          Zgłoś dzika
        </Fab>
      </div>
    </div>
  );
};

export default HomeScreen;
