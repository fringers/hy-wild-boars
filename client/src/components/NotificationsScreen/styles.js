import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  container: {
    height: `${window.innerHeight}px`,
    backgroundColor: theme.palette.primary.light,
  },
  list: {
    backgroundColor: theme.palette.primary.light,
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  genericIcon: {
    color: theme.palette.primary.dark,
    fontSize: 52,
    marginLeft: -6,
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  avatar: {
    borderRadius: 4,
  },
}));
