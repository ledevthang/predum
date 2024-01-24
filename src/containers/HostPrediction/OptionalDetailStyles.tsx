import { makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  container: {
    marginTop: 48,
    width: '100%',
    padding: '0px 195px',
    [theme.breakpoints.down('md')]: {
      marginTop: 24,
      padding: '0px 122px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  predictionText: {
    fontSize: 14,
    color: '#BDBDBD',
    marginBottom: 8,
  },
});

export const useStyles = makeStyles(styles);
