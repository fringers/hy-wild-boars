import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.light,
    height: `${window.innerHeight}px`,
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2, 2, 2),
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
  imageWrapper: {
    position: 'relative',
    width: '100vw',
    height: 300,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate( -50%, -50%)',
  },
}));
