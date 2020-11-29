import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  carousel: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: `calc(${window.innerHeight}px - 64px)`,
    minHeight: `calc(${window.innerHeight}px - 64px)`,
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  icon: {
    color: theme.palette.secondary.dark,
    height: 256,
    fontSize: 156,
  },
  infoContainer: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
  reverseButtonContainer: {
    flexDirection: 'row-reverse',
  },
  formControl: {
    width: 216,
  },
  map: {
    height: '100%',
    maxHeight: 316,
    width: '100%',
  },
  mapBtn: {
    marginTop: theme.spacing(2),
  },
  switchContainer: {
    '& > :last-child': {
      marginTop: theme.spacing(1),
    },
  },
  thumb: {
    color: theme.palette.primary.main,
  },
}));
