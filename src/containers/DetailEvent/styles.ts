import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      '& #video': {
        width: '100% !important',
        [theme.breakpoints.down('sm')]: {
          padding: '0px 16px',
        },
      },
    },
    video: {},
    breadcrumb: {
      cursor: 'pointer',
      display: 'inline-block',
    },
    thumbnail: {
      height: 120,
      width: '100%',
      marginTop: 20,
      marginBottom: 24,
    },
    header: {
      marginBottom: 16,
      lineHeight: '17px',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 16,
      },
    },
    description: {
      marginTop: 36,
      fontSize: 14,
      lineHeight: '150%',
      color: '#BDBDBD',
      [theme.breakpoints.down('md')]: {
        marginTop: 24,
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 20px',
      },
    },
    wapperProvider: {
      justifyContent: 'space-between',
      '&>button svg': {
        height: 24,
        width: 24,
        [theme.breakpoints.down('sm')]: {
          height: 16,
          width: 16,
          marginRight: 20,
        },
      },
    },
    wapperPoolAff: {
      height: 190,
      padding: 24,
      marginBottom: 24,
      background: '#1C1C1E',
      [theme.breakpoints.down('sm')]: {
        height: 150,
      },
    },
    hostByFirst: {
      display: 'flex',
      justifyContent: 'space-between',
      '&>div:first-child': {
        display: 'flex',
        alignItems: 'center',
        '&>svg': {
          height: 16,
          width: 16,
          marginRight: 4,
        },
        '&>p': {
          fontSize: 14,
          color: '#BDBDBD',
          cursor: 'pointer',
        },
        [theme.breakpoints.down('sm')]: {
          marginLeft: 16,
          marginRight: 24,
        },
      },
      '& button': {
        marginLeft: 12,
        borderRadius: 14,
        width: 76,
        height: 26,
        backgroundColor: '#C6EBFC',
        fontSize: 14,
        color: '#1976D2',
        marginRight: 12,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#C6EBFC !important',
        },
      },
    },
    share: {
      position: 'absolute',
      top: 10,
      right: 10,
      cursor: 'pointer',
    },
    wapperHeader: {
      marginBottom: 16,
      paddingRight: 8,
    },
    unfollow: {
      '& button': {
        backgroundColor: '#4B4B4B',
        color: '#BDBDBD !important',
        '&:hover': {
          backgroundColor: '#4B4B4B !important',
        },
      },
    },
    hostBy: {
      display: 'flex',
      alignItems: 'center',
      '&>svg': {
        height: 16,
        width: 16,
        marginRight: 4,
      },
      '& p': {
        fontSize: 14,
        color: '#BDBDBD',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 16,
        marginRight: 24,
      },
    },
    address: {
      cursor: 'pointer',
      marginLeft: 4,
      textDecoration: 'underline',
    },
    warningText: {
      marginLeft: 0,
    },
    chain: {
      [theme.breakpoints.down('sm')]: {
        marginLeft: 24,
      },
    },
    providerWarning: {
      // marginLeft: 24,
      // [theme.breakpoints.down('sm')]: {
      //   marginLeft: 16,
      // },
    },
    wapperPool: {
      height: 190,
      padding: 24,
      marginBottom: 24,
      background: '#1C1C1E',
      [theme.breakpoints.down('sm')]: {
        height: 260,
      },
    },
    wapperPrediction: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      marginTop: 40,
      marginBottom: 25,
      flexDirection: 'column',
      '&>p:first-child': {
        fontWeight: 600,
        fontSize: '28px',
        lineHeight: '32px',
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 20,
      },
    },
    pool: {
      height: '100%',
      display: 'flex',
      '&>div': {
        paddingLeft: 20,
        width: '50%',
        // marginTop: '8px',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          paddingLeft: 0,
          marginTop: 16,
        },
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    poolAmounts: {
      width: '50%',
      display: 'flex',
      // alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '55%',
      },
    },
    poolPrize: {
      borderRight: '1px solid gray',
      // paddingBottom: '8px',
      paddingLeft: 0,
      [theme.breakpoints.down('sm')]: {
        marginTop: '0px',
        borderRight: 'unset',
        borderBottom: '1px solid gray',
      },
    },
    poolItem: {
      width: '50%',
      display: 'flex',
      // alignItems: 'center',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        width: '45%',
        justifyContent: 'center',
        paddingRight: 40,
      },
      '&>div>div>svg': {
        height: 18,
        width: 18,
        marginBottom: 18,
        marginLeft: 4,
        color: 'white',
      },
      '&>div': {
        display: 'flex',
        marginTop: 10,
      },
      '&>svg:first-child': {
        height: 100,
        width: 100,
        // margin: '0px 24px 0px 38px',
        [theme.breakpoints.down('sm')]: {
          height: 55,
          width: 55,
          margin: 0,
        },
      },
      '& p': {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '19px',
        textAlign: 'center',
        color: '#ABABAB',
      },
    },
    column: {
      flexDirection: 'column',
    },
    spaceEvenly: {
      justifyContent: 'space-evenly',
    },
    note: {
      fontSize: '14px',
      lineHeight: '17px',
      color: '#BDBDBD',
    },
    highlightText: {
      color: '#3FADD5',
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      '& button': {
        background:
          'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
        borderRadius: '20px',
        height: '32px',
        width: '126px',
        color: 'black',
        marginRight: 40,
        [theme.breakpoints.down('sm')]: {
          marginRight: 20,
          width: 90,
          height: 24,
        },
      },
      '& p': {
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '24px',
        [theme.breakpoints.down('sm')]: {
          lineHeight: '16px',
          fontSize: '19px',
        },
      },
    },
    wrapper: {
      display: 'flex',
      '&>div': {
        width: '50%',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      },
      '&>div:first-child': {
        marginRight: 16,
        marginBottom: 16,
        [theme.breakpoints.down('sm')]: {
          marginRight: 0,
        },
      },
    },
    coin: {
      height: 16,
      width: 16,
      marginRight: 4,
    },
    selectCoin: {
      position: 'absolute',
      width: 100,
      right: 10,
      top: 0,
      '&>div:first-child': {
        background: 'unset !important',
      },
      [theme.breakpoints.down('sm')]: {
        position: 'initial',
      },
    },
    wrapperSortFilter: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        display: 'flex',
        paddingRight: 16,
        marginBottom: 8,
        justifyContent: 'flex-end',
        '&>div:first-child': {
          marginRight: 8,
        },
      },
    },
  });

export const useStyles = makeStyles(styles);
