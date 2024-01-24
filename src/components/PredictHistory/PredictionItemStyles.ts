import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#1C1C1E',
      padding: '16px 20px',
    },
    header: {
      display: 'flex',
      width: '100%',
      '& p': {
        lineHeight: '17px',
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
          fontSize: 12,
          lineHeight: '14px',
        },
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
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
      '&>p': {
        fontSize: 14,
        color: '#BDBDBD',
      },
      '&>p:first-child': {
        cursor: 'pointer',
      },
    },
    time: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 48,
      '&>p:first-child': {
        color: '#BDBDBD',
        marginRight: 4,
      },
      [theme.breakpoints.down('md')]: {
        marginRight: 24,
      },
    },
    transaction: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 48,
      '&>p:first-child': {
        color: '#BDBDBD',
        marginRight: 4,
      },
      '&>a': {
        background:
          'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
        textDecoration: 'underline',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      [theme.breakpoints.down('md')]: {
        marginRight: 24,
      },
    },
    category: {
      display: 'flex',
      alignItems: 'center',
      '&>svg': {
        width: 16,
        height: 16,
        marginRight: 8,
      },
      '&>p': {
        color: '#BDBDBD',
      },
    },
    wrapper: {
      display: 'flex',
    },
    report: {
      '& svg': {
        width: 16,
        height: 16,
        marginRight: 4,
      },
      marginLeft: 'auto',
      marginRight: '12px',
    },
    wrapperMobile: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
      alignItems: 'start',
    },
    name: {
      textDecoration: 'none',
      marginTop: 8,
      paddingBottom: 16,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
        paddingBottom: 12,
        width: 335,
      },

      '& p:first-child': {
        fontSize: 18,
        fontWeight: 600,
        color: '#FFFFFF',
      },
      '& p': {
        fontSize: 14,
        color: '#BDBDBD',
      },
    },
    wrapperName: {
      width: '100%',
      borderBottom: '1px solid #5A5A5E',
      paddingBottom: 16,
    },
    wrapperChoice: {
      marginTop: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        marginTop: 12,
      },
    },
    yourPrediction: {
      marginBottom: 12,
      fontSize: 14,
      color: '#BDBDBD',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    wrapperChoice1: {
      backgroundColor: '#111111',
      borderRadius: 2,
      border: '1px solid #3FADD5',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '& p': {
        textAlign: 'center',
        background:
          'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
          fontSize: 12,
        },
      },
    },
    wrapperType: {
      marginLeft: 20,
      '&>p:first-child': {
        fontSize: 20,
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
          fontSize: 18,
        },
      },
      '&>p:last-child': {
        fontSize: 13,
        color: '#BDBDBD',
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: {
          fontSize: 12,
        },
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 16,
      },
    },
    wrapper2: {
      display: 'flex',
      alignItems: 'center',
    },
    available: {
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      borderRadius: 20,
      fontSize: 14,
      fontWeight: 600,
      height: 40,
      width: 124,
      color: '#0B0B0E',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        height: 28,
      },
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
    wrapper3: {
      alignItems: 'flex-end',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 16,
      '&>p': {
        fontSize: 16,
        fontWeight: 600,
        textAlign: 'end',
        marginBottom: 8,
      },
    },
    wrapperOptionName: {
      display: 'flex',
      width: 'inherit',
      justifyContent: 'center',
      '&>p:nth-child(2)': {
        whiteSpace: 'nowrap',
        marginLeft: 4,
      },
    },
    wrapperVerify: {
      marginTop: 12,
      marginBottom: 12,
    },
    warningText: {},
    providerWarning: {
      // marginLeft: 24,
      // [theme.breakpoints.down('sm')]: {
      //   marginLeft: 16,
      // },
    },
    wrapperInfo: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 8,
      '&>p': {
        fontSize: 12,
        color: '#BDBDBD',
        [theme.breakpoints.down('sm')]: {
          fontSize: 10,
        },
      },
      '& svg': {
        marginLeft: 4,
        height: 12,
        width: 12,
      },
    },
    reportDisabled: {
      color: '#FFFFFF !important',
      opacity: 0.5,
    },
  });

export const useStyles = makeStyles(styles);
