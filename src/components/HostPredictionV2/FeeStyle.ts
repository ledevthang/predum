import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: '46px 100px 46px 54px',
      display: 'flex',
      backgroundColor: '#1C1C1E',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        padding: '36px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: 16,
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
      },
    },
    marginTop: {
      marginTop: 24,
      [theme.breakpoints.down('sm')]: {
        marginTop: 20,
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
    creationFee: {
      fontSize: 24,
      fontWeight: 600,
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      },
    },
    wrapperText: {
      '&>p:first-child': {
        fontSize: 24,
        fontWeight: 500,
        [theme.breakpoints.down('sm')]: {
          fontSize: 18,
        },
      },
      '&>p:last-child': {
        fontSize: 14,
        color: '#BDBDBD',
        [theme.breakpoints.down('sm')]: {
          fontSize: 12,
        },
      },
    },
    feePlatform: {
      fontSize: 14,
      color: '#BDBDBD',
    },
    selectFeeForHost: {
      width: 156,
      '&>div': {
        backgroundColor: '#1C1C1E',
        border: '1px solid #BDBDBD',
        borderRadius: 2,
      },
      [theme.breakpoints.down('sm')]: {
        width: 128,
      },
    },
    list: {
      '& ul': {
        listStyle: 'inside',
      },
      '&>p': {
        fontSize: 18,
        fontWeight: 500,
      },
      '& li': {
        display: 'list-item',
      },
    },
  });

export const useStyles = makeStyles(styles);
