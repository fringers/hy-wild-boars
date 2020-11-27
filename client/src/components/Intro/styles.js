import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    justifyContent: 'space-between',
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  icon: {
    color: theme.palette.primary.main,
    height: 256,
    fontSize: 156,
  },
  redIcon: {
    color: theme.palette.error.main,
    height: 256,
    fontSize: 156,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
}));
