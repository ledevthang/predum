import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    wapperCard: {
      marginTop: 10,
      marginBottom: 20,
      width: '100%',
      background: '#1C1C1E',
      padding: 24,
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.down('md')]: {
        padding: 16,
      },
    },
    banner: {
      width: '240px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    thumbnail: {
      height: 240,
      width: '100%',
    },
    info: {
      width: '70%',
      display: 'flex',
      marginLeft: 20,
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        width: '100%',
      },
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        height: 16,
        width: 16,
        marginRight: 8,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 16,
      },
    },
    timeWapper: {
      marginTop: 12,
      marginBottom: 16,
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    timeline: {
      display: 'flex',
      marginRight: 24,
      '& p': {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#FFFFFF',
      },
      '& p:first-child': {
        color: '#BDBDBD',
        marginRight: 4,
      },
    },
    short: {
      marginTop: 16,
      '& p': {
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '29px',
        color: '#FFFFFF',
      },
    },
  });

export const useStyles = makeStyles(styles);
