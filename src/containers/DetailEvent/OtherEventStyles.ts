import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    others: {
      marginTop: 20,
      marginBottom: 20,
      [theme.breakpoints.down('md')]: {
        marginTop: 20,
        marginBottom: 0,
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 20px',
      },
    },
    arrow: {
      padding: 4,
      border: '1px solid #BDBDBD',
      borderRadius: 20,
      cursor: 'pointer',
    },
    header: {
      fontSize: 36,
      fontWeight: 600,
      textAlign: 'center',
      marginBottom: 24,
      [theme.breakpoints.down('md')]: {
        fontSize: 24,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
    },
    container: {
      display: 'flex',
      overflow: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    main: {
      width: 270,
      cursor: 'pointer',
      height: '100%',
      marginRight: 20,
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('md')]: {
        width: 215,
      },
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100vw - 40px)',
        marginRight: 0,
        marginBottom: 24,
      },
    },
    img: {
      height: 0,
      paddingBottom: '100%',
      width: 'inherit',
      backgroundColor: '#1C1C1E',
    },
    name: {
      height: 70,
      padding: '0px 16px',
      backgroundColor: '#1C1C1E',
      '& p': {
        fontSize: 16,
        fontWeight: 600,
        marginTop: 12,
        [theme.breakpoints.down('md')]: {
          fontSize: 14,
        },
      },
    },
  });

export const useStyles = makeStyles(styles);
