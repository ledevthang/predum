import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    notiWapper: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '17px',
      textTransform: 'uppercase',
      color: 'white',
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      borderRadius: '20px',
      width: 228,
      height: 40,
      marginRight: '16px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        width: 190,
      },
      // marginBottom: '24px',
    },
    wrapper: {
      width: '100%',
      display: 'flex',
      marginBottom: 24,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    wrapper2: {
      width: '56%',
      borderRight: '1px solid #BDBDBD',
      paddingRight: 20,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        borderBottom: '1px solid #BDBDBD',
        borderRight: 'unset',
        marginBottom: 12,
        paddingBottom: 25,
      },
    },
    walletInfoWapper: {
      marginTop: '2px',
      marginLeft: 20,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
    balanceWapper: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '8px',
      fontSize: '16px',
      lineHeight: '17px',
      fontStyle: 'normal',
      color: '#BDBDBD',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    },
    totalNumber: {
      display: 'flex',
      alignItems: 'center',
      '&>p': {
        fontWeight: 700,
        color: '#3FADD5',
        fontSize: '24px',
        fontStyle: 'normal',
        lineHeight: '20px',
        marginTop: 4,
      },
      '&>div': {
        width: '19px !important',
        height: '19px !important',
        margin: '4px 6px 0px 6px',
      },
    },
    tooltip: {
      '&>div>svg': {
        width: 16,
        height: 16,
        color: 'white',
        marginLeft: 2,
      },
      display: 'flex',
    },
    moreNoti: {
      padding: '12px 8px',
      marginTop: 14,
      border: '1px solid #OEA3BF',
      background: '#04414F',
      '& p': {
        fontSize: 14,
        color: '#BDBDBD',
      },
    },
    moreNotiLight: {
      padding: '12px 8px',
      marginTop: 14,
      border: '1px solid #OEA3BF',
      background: '#e6fafd',
      '& p': {
        fontSize: 14,
        color: '#1c1c1e',
      },
    },
    highlightNoti: {
      color: '#3FADD5 !important',
      fontWeight: 600,
      padding: '0px 3px',
    },
    placeBet: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px',
    },
    inputBet: {
      backgroundColor: '#616161',
      width: 'calc(100% - 180px)',
      position: 'relative',
      borderRight: '1px solid #BDBDBD',
    },
    input: {
      height: 40,
    },
    inputLight: {
      height: 40,
      '&>div': {
        color: '#1c1c1e',
      },
    },
    wrapperPool: {
      display: 'flex',
      height: 40,
    },
    selectCoin: {
      backgroundColor: '#616161',
      marginLeft: 10,
      width: 100,
      '& p': {
        color: '#3FADD5',
        fontWeight: 600,
        marginRight: 4,
        fontSize: 14,
        lineHeight: 17,
      },
      '& svg': {
        height: 12,
        width: 12,
      },
    },
    selectCoinLight: {
      backgroundColor: '#e8e8e8',
      marginLeft: 10,
      width: 100,
      '& p': {
        color: '#FBC02D',
        fontWeight: 600,
        marginRight: 4,
        fontSize: 14,
        lineHeight: 17,
      },
      '& svg': {
        height: 12,
        width: 12,
      },
    },
    coin: {
      height: 16,
      width: 16,
      marginRight: 4,
    },
    buttonMax: {
      width: '36px',
      height: '20px',
      backgroundColor: '#3FADD5',
      color: 'black',
      position: 'absolute',
      top: '10px',
      right: '6px',
      borderRadius: '2px',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    buyToken: {
      display: 'flex',
      marginLeft: '8px',
      '& p': {
        cursor: 'pointer',
        color: '#3FADD5',
        marginLeft: 4,
        marginRight: 4,
      },
    },
    predictTitle: {
      display: 'flex',
      alignItems: 'center',
      '&>div': {
        height: 16,
      },
      '&>p': {
        marginRight: 16,
        color: '#BDBDBD',
        fontSize: 16,
        marginBottom: 7,
        [theme.breakpoints.down('sm')]: {
          fontSize: 14,
        },
      },
      '&>div>svg': {
        height: 13,
        width: 13,
        marginBottom: 12,
        marginRight: 16,
      },
    },
    predictTitleLight: {
      display: 'flex',
      alignItems: 'center',
      '&>div': {
        height: 16,
      },
      '&>p': {
        marginRight: 16,
        color: '#1C1C1E',
        fontSize: 16,
        marginBottom: 7,
        [theme.breakpoints.down('sm')]: {
          fontSize: 14,
        },
      },
      '&>div>svg': {
        height: 13,
        width: 13,
        marginBottom: 12,
        marginRight: 16,
      },
    },
    selectedOption: {
      display: 'flex',
      marginBottom: 8,
      '&>p:last-child': {
        fontWeight: 600,
        marginLeft: 4,
      },
    },
  });

export const useStyles = makeStyles(styles);
