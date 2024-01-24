import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#1C1C1E',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 36,
    },
    share: {
      position: 'absolute',
      top: 10,
      right: 10,
      cursor: 'pointer',
    },
    header: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
      '& p': {
        lineHeight: '17px',
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
          fontSize: 12,
          lineHeight: '14px',
        },
      },
      '& div > div': {
        marginBottom: 10,
      },
      '& div > button': {
        marginBottom: 10,
      },
    },
    hostBy: {
      display: 'flex',
      marginRight: 48,
      alignItems: 'center',
      '&>svg': {
        height: 16,
        width: 16,
        marginRight: 4,
      },
      '&>p': {
        color: '#BDBDBD',
      },
      '&>p:first-child': {
        cursor: 'pointer',
      },
      [theme.breakpoints.down('md')]: {
        marginRight: 24,
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
      '&>p:last-child': {
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
    description: {
      padding: '16px 20px',
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
      flexWrap: 'wrap',
    },
    report: {
      '& svg': {
        width: 16,
        height: 16,
        marginRight: 4,
      },
      marginLeft: 20,
      [theme.breakpoints.down('md')]: {
        // marginLeft: 'inherit',
      },
    },
    wrapperMobile: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    status: {
      width: '94px',
      height: '24px',
      background: '#ADCEEF',
      marginLeft: 40,
      borderRadius: '20px',
      '& p': {
        textAlign: 'center',
        paddingTop: 4,
        textTransform: 'uppercase',
        color: '#1976D2',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '13px',
        lineHeight: '16px',
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: 20,
      },
    },
    body: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    mainBodyWapper: {
      // width: 480,
      // marginLeft: 20,
      width: '100%',
      marginTop: 10,
      paddingRight: 10,
      [theme.breakpoints.down('md')]: {
        marginTop: 6,
        // width: 500,
      },
      [theme.breakpoints.down('sm')]: {
        borderRight: 'none',
        marginTop: 0,
      },
    },
    namePredictionWapper: {
      marginBottom: 8,
      '& p': {
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '18px',
        lineHeight: '22px',
        color: '#FFFFFF',
      },
      [theme.breakpoints.down('md')]: {
        marginBottom: 12,
      },
    },
    optionsWapper: {
      display: 'flex',
      marginTop: 12,
      marginBottom: 16,
      flexWrap: 'wrap',
      [theme.breakpoints.down('sm')]: {
        marginBottom: 12,
      },
    },
    option: {
      marginRight: 16,
    },
    optionOverUnder: {
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      backgroundColor: '#111111',
      alignItems: 'center',
      width: 96,
      boxSizing: 'content-box',
      height: '54px',
      marginRight: '10px',
      padding: '0px 16px',
      '& p': {
        fontStyle: 'normal',
        height: 17,
        textAlign: 'center',
        fontSize: '14px',
        lineHeight: '17px',
      },
      '& p:first-child': {
        fontWeight: 400,
        marginRight: 4,
      },
      [theme.breakpoints.down('sm')]: {
        height: 48,
        width: 65,
      },
    },
    optionHasResult: {
      cursor: 'default',
    },
    choosed: {
      '& p': {
        color: '#3FADD5',
      },
      border: '1px solid #3FADD5',
    },
    overUnderCorrect: {
      color: '#3FADD5',
    },
    notice: {
      fontSize: 14,
      marginTop: 24,
      color: '#BDBDBD',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    cursorPointer: {
      cursor: 'pointer',
    },
    disabledClaim: {
      color: 'inherit !important',
    },
    commonInput: {
      width: 300,
      height: 44,
      marginBottom: 16,
      [theme.breakpoints.down('md')]: {
        width: 'calc(100% - 12px)',
      },
      [theme.breakpoints.down('sm')]: {
        width: 'unset',
        marginBottom: 12,
      },
    },
    timeWapper: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      '& div': {
        marginBottom: 12,
      },
    },
    timeline: {
      display: 'flex',
      marginRight: 24,
      '& p': {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#FFFFFF',
      },
      '& p:first-child': {
        color: '#BDBDBD',
        marginRight: 4,
      },
    },
    statisticsWapper: {
      marginTop: 18,
      marginLeft: 20,
      [theme.breakpoints.down('sm')]: {
        marginTop: 8,
        marginLeft: 0,
      },
    },
    titleStatistics: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '22px',
      color: '#FFFFFF',
      marginBottom: 24,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 8,
      },
    },
    statistics: {},
    statisticsInfo: {
      marginBottom: 16,
      display: 'flex',
      '& p:first-child': {
        color: '#BDBDBD',
        marginRight: 4,
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 4,
      },
    },
    highline: {
      fontWeight: 600,
      color: '#FFFFFF',
    },
    confirmWapper1: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 10,
    },
    confirmWapper2: {
      width: 146,
      borderRadius: '20px',
      height: 48,
      marginBottom: 10,
      marginLeft: '16px',
      marginRight: '16px',
      marginTop: 10,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
    },
    confirmWapper2Disabled: {
      width: 146,
      borderRadius: '20px',
      height: 48,
      marginBottom: 10,
      marginLeft: '16px',
      marginRight: '16px',
      marginTop: 10,
      cursor: 'unset',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
    },
    wrapperButton: {
      '& button:first-child': {
        borderRadius: 14,
        width: 76,
        height: 26,
        backgroundColor: '#C6EBFC',
        fontSize: 14,
        color: '#1976D2',
        marginRight: 12,
        textTransform: 'none',
        display: 'none',
      },
      '& button:last-child': {
        borderRadius: 14,
        width: 76,
        height: 26,
        backgroundColor: '#FEF3D9',
        fontSize: 14,
        color: '#212121',
        textTransform: 'none',
      },
    },
    confirm: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '17px',
      textTransform: 'uppercase',
      color: '#0B0B0E',
    },
    confirmDisabled: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '17px',
      // pointerEvents: 'none',
      textTransform: 'uppercase',
      color: 'rgba(0, 0, 0, 0.26)',
    },
    confirmDisabledClaimed: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '17px',
      // pointerEvents: 'none',
      textTransform: 'uppercase',
      color: '#BDBDBD',
    },
    claimLiquidityResult: {
      marginTop: 18,
      display: 'flex',
      alignItems: 'center',
    },
    remainingPoolText: {
      fontSize: 16,
      fontWeight: 600,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    remainingPoolMobile: {
      marginLeft: 4,
      '&>p': {
        fontWeight: 600,
        fontSize: 16,
      },
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    confirmWapperClaimBtn: {
      width: 146,
      borderRadius: '20px',
      height: 48,
      marginLeft: '16px',
      marginRight: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
    },
    confirmWapperClaimBtnDisabled: {
      width: 146,
      borderRadius: '20px',
      height: 48,
      marginLeft: '16px',
      marginRight: '16px',
      cursor: 'pointer',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#4B4B4B',
    },
    overUnderName: {
      flexGrow: 1,
      marginLeft: 16,
    },
    overUnderValue: {
      width: 60,
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '17px',
      [theme.breakpoints.down('sm')]: {
        width: 40,
      },
    },
    handicap: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 4,
      marginRight: '20px !important',
      '&>p': {
        whiteSpace: 'nowrap',
        fontSize: 18,
        fontWeight: '600',
        [theme.breakpoints.down('sm')]: {
          fontSize: 16,
        },
      },
    },
    handicapHasResult: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 4,
      marginRight: '20px !important',
      minWidth: '40px',
      justifyContent: 'center',
      marginBottom: 70,
      '&>p': {
        whiteSpace: 'nowrap',
        fontSize: 18,
        fontWeight: '600',
        [theme.breakpoints.down('sm')]: {
          fontSize: 16,
        },
      },
    },
    totalScore: {
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      '& p': {
        marginRight: 8,
      },
    },
    commonInputTotalScore: {
      height: 30,
      width: 197,
      backgroundColor: '#4B4B4B',
      '& input': {
        color: 'white',
      },
    },
    commonInputHomeDrawAway: {
      height: 30,
      width: 128,
      marginTop: 14,
      backgroundColor: '#4B4B4B',
      '& input': {
        color: 'white',
      },
    },
    commonInputWithImage: {
      width: 128,
    },
    wapperOverUnder: {
      width: '100%',
      marginRight: 20,
      '& div:first-child': {
        backgroundColor: '#4B4B4B',
        height: 40,
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
    unsetAlign: {
      alignItems: 'unset !important',
    },
    proNoti: {
      fontWeight: 500,
      fontSize: '16px',
      color: '#FFFFFF',
    },
    wapperHandicap: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapperChoiceScroll: {
      '&> .react-horizontal-scrolling-menu--item:not(:last-child)': {
        marginRight: 10,
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    tooltip: {
      fontSize: '14px',
      backgroundColor: '#111111',
      width: '500px',
    },
    thumbnail: {
      height: 200,
      width: '100%',
      marginBottom: 24,
    },
    wapperPrediction: {
      display: 'flex',
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
    label: {
      color: '#bdbdbd',
      fontSize: '14px',
      lineHeight: '17px',
      marginBottom: '12px',
    },
    wapperChooseResult: {
      display: 'flex',
      '&>div:first-child': {
        [theme.breakpoints.down('md')]: {
          width: '100%',
        },
        [theme.breakpoints.down('sm')]: {
          width: '340px',
        },
      },
    },
    wapperLink: {
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        marginBottom: 12,
      },
    },
    input: {
      width: 300,
      height: 44,
      backgroundColor: '#4B4B4B',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    select: {
      '&>div:first-child': {
        background: '#616161',
      },
      marginLeft: 16,
      height: 44,
      width: 100,
    },
  });

export const useStyles = makeStyles(styles);
