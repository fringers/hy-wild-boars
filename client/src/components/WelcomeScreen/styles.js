import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
  container: {
    alignItems: 'center',
    backgroundColor: palette.primary.light,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
  },
  img: {
    width: 256,
    paddingBottom: spacing(12),
  },
  title: {
    marginBottom: spacing(12),
  },
}));
