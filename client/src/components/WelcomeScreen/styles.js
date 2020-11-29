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
  wrapper: {
    paddingBottom: spacing(12),
  },
  img: {
    width: 256,
  },
  title: {
    marginBottom: spacing(12),
  },
  footprints: {
    display: 'flex',
  },
  step1: {
    marginLeft: spacing(2.5),
  },
  step2: {
    marginTop: spacing(-0.5),
    marginLeft: spacing(5),
  },
  step3: {
    marginLeft: spacing(5),
  },
  step4: {
    marginTop: spacing(-0.5),
  },
}));
