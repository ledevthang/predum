import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: '46px 100px 46px 54px',
      display: 'flex',
      backgroundColor: '#1C1C1E',
      [theme.breakpoints.down('md')]: {
        padding: '36px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: 16,
        flexDirection: 'column',
      },
    },
    main: {
      flexGrow: 1,
      marginLeft: 120,
      [theme.breakpoints.down('md')]: {
        marginLeft: 80,
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
    img: {
      width: 120,
      height: 120,
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        marginBottom: 12,
      },
    },
    name: {
      fontSize: 24,
      fontWeight: 600,
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      },
    },
    time: {
      display: 'flex',
      marginBottom: 12,
      '&>p:first-child': {
        fontSize: 14,
        color: '#BDBDBD',
      },
      '&>p:last-child': {
        fontSize: 14,
        marginLeft: 4,
      },
    },
    description: {
      fontSize: 14,
      color: '#BDBDBD',
    },
    wrapperTime: {
      '&>div:first-child': {
        marginRight: 32,
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        '&>div:first-child': {
          marginRight: 0,
        },
        '&>p': {
          whiteSpace: 'nowrap',
        },
      },
    },
    category: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 4,
      '&>svg': {
        height: 16,
        width: 16,
      },
      '&>p': {
        fontSize: 14,
        color: '#BDBDBD',
        marginLeft: 4,
      },
    },
    teamLogo: {
      width: 40,
      height: 40,
      backgroundSize: 'contain',
      [theme.breakpoints.down('sm')]: {
        width: 56,
        height: 84,
      },
    },
    vs: {
      fontSize: 14,
      color: '#BDBDBD',
      margin: '0px 8px',
      [theme.breakpoints.down('sm')]: {
        margin: '0px 24px',
      },
    },
  });

export const useStyles = makeStyles(styles);
