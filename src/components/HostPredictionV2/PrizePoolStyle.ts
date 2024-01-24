import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: '46px 100px 46px 54px',
      display: 'flex',
      position: 'relative',
      backgroundColor: '#1C1C1E',
      [theme.breakpoints.down('md')]: {
        padding: '36px 32px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '16px 32px 16px 16px',
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
    wrapperPool: {
      marginBottom: 24,
      display: 'flex',
      position: 'relative' as any,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 20,
      },
    },
    clear: {
      position: 'absolute' as any,
      right: -40,
      top: 12,
      '& svg': {
        width: 16,
        height: 16,
      },
      [theme.breakpoints.down('sm')]: {
        right: -20,
        '& svg': {
          width: 12,
          height: 12,
        },
      },
    },
    liquidityPool: {
      height: 44,
      flexGrow: 1,
      width: 'unset',
      backgroundColor: '#4B4B4B',
      marginRight: 12,
      '& input::placeholder': {
        color: '#FFFFFF',
      },
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    coin: {
      height: 24,
      width: 24,
      marginRight: 8,
    },
    selectCoin: {
      width: 124,
      [theme.breakpoints.down('sm')]: {
        width: 100,
      },
    },
    addPoolBtn: {
      height: 44,
      border: '1px dashed #BDBDBD',
      borderRadius: 2,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    disabled: {
      color: '#FFFFFF !important',
      opacity: 0.6,
    },
    refreshBtn: {
      position: 'absolute',
      right: 70,
      top: 64,
      '& svg': {
        fill: '#1C1C1E',
        height: 16,
        width: 16,
        [theme.breakpoints.down('sm')]: {
          height: 12,
          width: 12,
        },
      },
      [theme.breakpoints.down('md')]: {
        right: 8,
        top: 52,
      },
      [theme.breakpoints.down('sm')]: {
        right: 12,
        top: 30,
      },
    },
    refreshAnimation: {
      animation: `$refresh 1000ms infinite linear`,
    },
    '@keyframes refresh': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  });

export const useStyles = makeStyles(styles);
