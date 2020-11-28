import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  carousel: {
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '90vh',
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  icon: {
    color: theme.palette.secondary.main,
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
  formControl: {
    width: 216,
  },
  photoImg: {
    borderColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: theme.spacing(0.5),
    maxHeight: 148,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  mapBtn: {
    marginTop: theme.spacing(2),
  },
}));
