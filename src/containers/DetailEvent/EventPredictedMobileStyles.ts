import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    wapper: {
      padding: '16px',
      border: '1px solid gray',
      borderRadius: '2px',
      boxSizing: 'border-box',
      margin: '6px 16px 6px 16px',
    },
    wapper2: {
      width: '100%',
      paddingBottom: 20,
      [theme.breakpoints.down('sm')]: {
        paddingBottom: 4,
      },
    },
    item: {
      display: 'flex',
      margin: '4px',
      '&>p': {
        width: '50%',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#FFFFFF',
      },
    },
    host: {
      border: '1px solid #3FADD5',
    },
    borderBottom: {
      borderBottom: '1px solid gray',
    },
    wapperStatus: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& svg': {
        height: 12,
        width: 12,
        marginBottom: 12,
        marginLeft: 4,
      },
    },
    status: {
      fontWeight: 500,
      fontSize: '24px',
      lineHeight: '29px',
      color: '#17C7A7',
      marginTop: 24,
      marginBottom: 8,
    },
    loseColor: {
      color: '#E53935',
    },
    report: {
      marginTop: 8,
      '& svg': {
        width: 16,
        height: 16,
        marginRight: 4,
        marginBottom: 0,
      },
      marginBottom: 20,
    },
    pending: {
      borderRadius: 20,
      fontSize: 14,
      fontWeight: 600,
      width: 124,
      height: 28,
      background: '#183755',
      color: '#1976D2 !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        width: 100,
        height: 24,
      },
    },
    finished: {
      borderRadius: 20,
      fontSize: 14,
      fontWeight: 600,
      width: 124,
      margin: '10px 0px',
      height: 28,
      background: '#4B4B4B',
      color: '#BDBDBD !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        width: 100,
        height: 24,
      },
    },
    invalid: {
      borderRadius: 20,
      fontSize: 14,
      fontWeight: 600,
      width: 94,
      height: 28,
      background: '#5A2423',
      color: '#E53935 !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        width: 94,
        height: 24,
      },
    },
    available: {
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      borderRadius: 20,
      fontSize: 14,
      fontWeight: 600,
      height: 40,
      margin: '10px 0px',
      width: 124,
      color: '#0B0B0E',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        height: 28,
      },
    },
    reportDisabled: {
      color: '#FFFFFF !important',
      opacity: 0.5,
    },
    whiteColor: {
      color: 'white',
    },
    pagination: {
      marginTop: 12,
      '& .MuiPaginationItem-outlined': {
        border: '1px solid #616161',
      },
      '& .MuiPaginationItem-page.Mui-selected': {
        border: '1px solid #3FADD5',
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 24,
      },
    },
  });

export const useStyles = makeStyles(styles);
