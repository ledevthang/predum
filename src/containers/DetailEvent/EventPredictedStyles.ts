import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    label: {
      display: 'flex',
      marginBottom: 10,
      '&>div:not(:first-child)': {
        width: '22%',
        fontStyle: 'normal',
        '&>p': {
          fontWeight: 500,
          fontSize: '20px',
          lineHeight: '24px',
          color: '#FFFFFF',
        },
      },
      '&>div:first-child': {
        flexGrow: 1,
      },
    },
    prediction: {
      display: 'flex',
      marginBottom: 16,
      border: '1px solid gray',
      borderRadius: '2px',
      '&>div:first-child': {
        flexGrow: 1,
        display: 'flex',
        width: 'unset',
        flexDirection: 'column',
      },
      '&>div': {
        display: 'flex',
        justifyContent: 'center',
        width: '88%',
        '&>p': {
          textAlign: 'center',
          color: '#FFFFFF',
          fontSize: '16px',
          lineHeight: '19px',
        },
      },
    },
    wapperItems: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '88%',
      '&>div': {
        width: '100%',
      },
      '&>div:first-child': {
        display: 'flex',
      },
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '12px 0px 12px 0px',
      width: '25%',
      '&>p': {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: '16px',
        lineHeight: '19px',
      },
    },
    time: {
      '& p:first-child': {
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '19px',
        color: '#FFFFFF',
        marginBottom: 4,
      },
    },
    borderHost: {
      border: '1px solid #3FADD5',
    },
    borderBottom: {
      borderBottom: '1px solid gray',
    },
    host: {
      // background: 'linear-gradient(90deg, #FBC02D 0%, #FACF66 100%)',
      borderRadius: '2px 0px 0px 2px',
      '& p': {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '17px',
        textAlign: 'center',
        color: '#3FADD5 !important',
      },
    },
    wapperStatus: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 16,
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
    whiteColor: {
      color: 'white',
    },
    highlightText: {
      fontWeight: 600,
      color: '#3FADD5 !important',
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
      margin: '10px 0px',
      width: 124,
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
    sortIcon: {
      display: 'flex',
      marginLeft: 4,
      flexDirection: 'column',
      '& svg': {
        height: 16,
        width: 16,
      },
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
