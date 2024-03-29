import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    wapperBetSlipItem: {
      padding: '16px 16px 0px 16px',
      '& svg:first-child': {
        width: 14,
        height: 14,
      },
    },
    wapperBetSlip: {
      position: 'fixed',
      top: 82,
      right: 60,
      zIndex: 3,
      height: 'calc(100vh - 100px)',
      overflowY: 'scroll',
      overflow: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      [theme.breakpoints.down('md')]: {
        position: 'initial',
      },
    },
    betSlip: {
      width: '260px',
      backgroundColor: '#1C1C1E',
      paddingBottom: 24,
      [theme.breakpoints.down('md')]: {
        width: '292px',
        backgroundColor: '#333333',
      },
    },
    title: {
      backgroundColor: '#333333',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '19px',
      paddingTop: '11px',
      paddingBottom: '10px',
      paddingLeft: '16px',
      display: 'flex',
      '&>div>svg': {
        marginLeft: 4,
      },
    },
    titleEachBet: {
      width: '200px',
      fontWeight: 600,
      fontStyle: 'normal',
      fontSize: '14px',
      lineHeight: '17px',
      color: '#FFFFFF',
      [theme.breakpoints.down('md')]: {
        width: '292px',
      },
    },
    headerBetSlipItem: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      justifyContent: 'space-between',
      marginBottom: '4px',
    },
    typeBet: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '17px',
      display: 'inline-block',
      margin: '4px',
    },
    type: {
      display: 'flex',
      alignItems: 'center',
    },
    odds: {
      marginRight: '4px',
      marginBottom: '12px',
      marginTop: '12px',
      display: 'flex',
      alignItems: 'center',
    },
    oddsNumber: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '19px',
      color: 'white',
      paddingTop: '2px',
      paddingBottom: '3px',
      paddingRight: '12px',
      paddingLeft: '12px',
      marginRight: 12,
      backgroundImage: 'linear-gradient(#3FADD5,#3FADD5)',
      borderRadius: '2px',
      width: '38px',
    },
    oddsName: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '19px',
      color: '#FFFFFF',
    },
    placeBet: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px',
    },
    inputBet: {
      backgroundColor: '#616161',
      width: 'calc(100% - 56px)',
      position: 'relative',
      borderRight: '1px solid #BDBDBD',
    },
    buttonMax: {
      width: '36px',
      height: '20px',
      backgroundColor: '#616161',
      color: '#3FADD5',
      position: 'absolute',
      top: '6px',
      right: '6px',
      borderRadius: '2px',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    devider: {
      color: '#616161',
      fontSize: '1px',
      border: '1px solid #616161',
      marginTop: 8,
    },
    walletInfoWapper: {
      marginTop: '24px',
      marginLeft: '16px',
      marginBottom: '24px',
    },
    balanceWapper: {
      display: 'flex',
      marginBottom: '8px',
      fontSize: '14px',
      lineHeight: '17px',
      fontStyle: 'normal',
      color: '#BDBDBD',
    },
    balanceNumber: {
      fontWeight: 700,
      color: '#ffffff',
      marginLeft: '3px',
    },
    totalNumber: {
      fontWeight: 700,
      marginLeft: '3px',
      color: '#3FADD5',
    },
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
      marginLeft: '16px',
      marginRight: '16px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      // marginBottom: '24px',
    },
    banner: {
      height: 400,
      width: 260,
      marginTop: 20,
      marginBottom: 0,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    menu: {
      borderTop: '1px solid gray',
      paddingLeft: 16,
      paddingTop: 16,
      '&>p': {
        fontSize: '14px',
        textTransform: 'uppercase',
        color: '#5A5A5E',
        marginBottom: 8,
        cursor: 'pointer',
      },
      '&>div>p:first-child': {
        fontSize: '14px',
        textTransform: 'uppercase',
        color: '#5A5A5E',
        marginBottom: 8,
        cursor: 'pointer',
      },
    },
    emptyText: {
      marginTop: 24,
      marginLeft: 16,
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '19px',
    },
    // menu: {
    //   borderTop: '1px solid gray',
    //   paddingLeft: 16,
    //   paddingTop: 16,
    //   '&>p': {
    //     fontSize: '14px',
    //     lineHeight: '17px',
    //     textTransform: 'uppercase',
    //     color: '#5A5A5E',
    //     marginBottom: 8,
    //     cursor: 'pointer',
    //   },
    // },
    coin: {
      height: 16,
      width: 16,
      marginRight: 4,
    },
    selectCoin: {
      backgroundColor: '#616161',
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
    wrapperPool: {
      display: 'flex',
      height: 32,
    },
    input: {
      height: 32,
    },
    headerRecentBet: {
      height: 40,
      backgroundColor: '#333333',
      fontSize: 16,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 16,
    },
    itemBet: {
      padding: 16,
    },
    containerRecentBet: {
      width: 260,
      backgroundColor: '#1C1C1E',
      paddingBottom: 24,
      marginTop: 20,
      position: 'relative',
      '& .indicators': {
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 36,
        position: 'absolute',
      },
      [theme.breakpoints.down('md')]: {
        width: 292,
        backgroundColor: 'unset',
      },
    },
    indicator: {
      cursor: 'pointer',
      borderRadius: '50%',
      width: 8,
      height: 8,
      backgroundColor: '#666',
      margin: '0px 6px',
      '&.active': {
        backgroundColor: '#3FADD5',
      },
    },
    wrapper1: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    address: {
      backgroundColor: '#616161',
      borderRadius: 20,
      padding: '10px 20px',
      textTransform: 'uppercase',
      color: '#BDBDBD',
    },
    time: {
      '&>p:first-child': {
        fontSize: 14,
        fontWeight: 500,
      },
      '&>p:last-child': {
        fontSize: 14,
        color: '#BDBDBD',
        textAlign: 'center',
      },
    },
    recentName: {
      fontSize: 18,
      fontWeight: 600,
      marginTop: 12,
      marginBottom: 4,
    },
    yourPrediction: {
      fontSize: 14,
      color: '#BDBDBD',
    },
    wrapperMain: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 12,
    },
    recentOdd: {
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      borderRadius: 2,
      fontSize: 16,
      fontWeight: 600,
      color: '#212121',
      width: 36,
      height: 36,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recentOption: {
      padding: '0px 12px',
      borderRight: '1px solid #616161',
      '&>p:first-child': {
        fontSize: 14,
        fontWeight: 600,
        textAlign: 'center',
      },
      '&>p:last-child': {
        fontSize: 13,
        color: '#BDBDBD',
        textAlign: 'center',
      },
    },
    recentTotal: {
      fontSize: 20,
      fontWeight: 600,
      marginLeft: 12,
    },
    betWithBorder: {
      borderBottom: '1px solid #616161',
    },
    buyToken: {
      display: 'flex',
      marginTop: 8,
      justifyContent: 'flex-end',
      '&>p': {
        cursor: 'pointer',
        color: '#3FADD5',
        fontSize: 14,
        marginRight: 16,
      },
    },
    refreshBtn: {
      marginLeft: 8,
      '& svg': {
        fill: '#1C1C1E',
        height: 12,
        width: 12,
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
