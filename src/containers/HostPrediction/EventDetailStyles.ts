import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      marginTop: 48,
      padding: '0px 195px',
      [theme.breakpoints.down('md')]: {
        marginTop: 24,
        padding: '0px 122px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
    commonInput: {
      height: 44,
      backgroundColor: '#4B4B4B',
      marginBottom: 24,
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    wrapper: {
      display: 'flex',
      marginBottom: 24,
    },
    dateTime: {
      height: 44,
      backgroundColor: '#4B4B4B',
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    wapperEndTime: {
      marginTop: 40,
    },
    wrapperTime: {
      display: 'flex',
      '&>div:first-child': {
        marginRight: 12,
      },
    },
    marginBottom: {
      marginBottom: 24,
    },
    customAddButton: {
      marginBottom: 24,
    },
  });

export const useStyles = makeStyles(styles);
