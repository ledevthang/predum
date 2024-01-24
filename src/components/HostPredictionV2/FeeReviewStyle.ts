import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: '46px 100px 46px 54px',
      display: 'flex',
      backgroundColor: '#1C1C1E',
      alignItems: 'center',
      marginTop: 24,
      [theme.breakpoints.down('md')]: {
        padding: '36px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: 16,
        marginTop: 20,
      },
    },
    main: {
      marginLeft: 120,
      flexGrow: 1,
      [theme.breakpoints.down('md')]: {
        marginLeft: 80,
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    svg: {
      width: 120,
      height: 120,
      border: '1px solid #BDBDBD',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    token: {
      width: 'fit-content',
      fontSize: 24,
      fontWeight: 600,
      marginTop: 12,
    },
  });

export const useStyles = makeStyles(styles);
