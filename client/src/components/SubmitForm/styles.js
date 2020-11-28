import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  paper: {
    alignItems: 'center',
    backgroundColor: '#dcd1bc',
    display: 'flex',
    flexDirection: 'column',
    height: '86vh',
    justifyContent: 'space-between',
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  icon: {
    color: '#9f8960', //theme.palette.primary.main,
    height: 256,
    fontSize: 156,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
}));
