import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#1C1C1E',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    containerEnded: {
      backgroundColor: '#1C1C1E',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    containerDisable: {
      backgroundColor: '#1C1C1E',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
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
    loading: {
      marginRight: 8,
    },
    wrapperMobile: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    body: {
      display: 'flex',
      // justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        justifyContent: 'unset',
      },
    },
    mainBodyWapper: {
      width: '60%',
      // marginLeft: 20,
      borderRight: '1px solid #5A5A5E',
      marginTop: 10,
      paddingRight: 10,
      [theme.breakpoints.down('md')]: {
        marginTop: 6,
        // width: 500,
      },
      [theme.breakpoints.down('sm')]: {
        borderBottom: '1px solid #5A5A5E',
        borderRight: 'none',
        marginTop: 0,
        width: '100%',
      },
    },
    optionsWapper: {
      display: 'flex',
      marginTop: 12,
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },

      marginBottom: 16,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 12,
      },
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
    select: {
      '&>div:first-child': {
        background: '#616161',
      },
      marginLeft: 16,
      height: 44,
      width: 100,
    },
    label: {
      color: '#bdbdbd',
      fontSize: '14px',
      lineHeight: '17px',
      marginBottom: '12px',
    },
    input: {
      width: 300,
      height: 44,
      backgroundColor: '#4B4B4B',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    wapperLink: {
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        marginBottom: 12,
      },
    },
    button: {
      width: 70,
      height: 30,
      position: 'absolute',
      top: 7,
      right: 6,
      backgroundColor: '#616161',
    },
    option: {
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      backgroundColor: '#111111',
      alignItems: 'center',
      flexDirection: 'column',
      width: 96,
      boxSizing: 'content-box',
      height: '54px',
      marginRight: '10px',
      padding: '0px 16px',
      '& p': {
        width: 'inherit',
        fontStyle: 'normal',
        height: 17,
        textAlign: 'center',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '17px',
      },
      '& p:first-child': {
        marginBottom: 4,
        fontWeight: 400,
      },
      [theme.breakpoints.down('sm')]: {
        height: 48,
        width: 65,
      },
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
        heigh6t: 48,
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
    commonInput: {
      width: 300,
      height: 44,
      marginBottom: 16,
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 12,
        // width: 375,
      },
    },
    cursorPointer: {
      cursor: 'pointer',
    },
    statisticsWapper: {
      marginTop: 18,
      marginLeft: 20,
      height: 246,
      [theme.breakpoints.down('sm')]: {
        marginTop: 8,
        marginLeft: 0,
        height: 170,
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
    statistics: {},
    statisticsInfo: {
      marginBottom: 16,
      display: 'flex',
      '& p:first-child': {
        color: '#BDBDBD',
        marginRight: 4,
        whiteSpace: 'nowrap',
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
      height: 66,
    },
    confirmWapper2: {
      width: 146,
      borderRadius: '20px',
      height: 48,
      marginLeft: '16px',
      marginRight: '16px',
      marginTop: 18,
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
    confirmDisabled: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '17px',
      textTransform: 'uppercase',
      color: 'rgba(0, 0, 0, 0.26)',
    },
    confirmDisabledClaimed: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '17px',
      textTransform: 'uppercase',
      color: '#BDBDBD',
    },
    confirm: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '17px',
      textTransform: 'uppercase',
      color: '#0B0B0E',
    },
    disabledClaim: {
      color: 'inherit !important',
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
      marginLeft: 16,
      marginRight: '16px',
      '&>p': {
        whiteSpace: 'nowrap',
        fontSize: 18,
        fontWeight: '600',
        [theme.breakpoints.down('sm')]: {
          fontSize: 16,
        },
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 0,
      },
    },
    handicapHasResult: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 20,
      minWidth: '40px',
      justifyContent: 'center',
      marginRight: '20px',
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
    wapperOverUnder: {
      width: '100%',
      marginRight: 20,
      '& div:first-child': {
        backgroundColor: '#4B4B4B',
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
    claimLiquidityResult: {
      marginTop: 18,
      display: 'flex',
      alignItems: 'center',
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
    wapperHandicap: {
      // height: 122,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        // height: 112,
      },
    },
    wrapperHomeDrawAway: {
      '&>div': {
        marginRight: 16,
      },
    },
    wrapperChoiceScroll: {
      '&> .react-horizontal-scrolling-menu--item:not(:last-child)': {
        marginRight: 10,
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    wapperMulti: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    tooltip: {
      fontSize: '14px',
      backgroundColor: '#111111',
      width: '500px',
    },
    proNoti: {
      fontWeight: 500,
      fontSize: '16px',
      color: '#FFFFFF',
    },
    wrapperMultipleChoice: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      '&>div': {
        marginRight: 16,
        marginTop: 12,
      },
      [theme.breakpoints.down('sm')]: {
        width: `${window.innerWidth - 32}px`,
      },
    },
    wrapperTruFalse: {
      display: 'flex',
      alignItems: 'center',
      '&>div': {
        marginRight: 16,
      },
      [theme.breakpoints.down('sm')]: {
        '&>div': {
          marginRight: 16,
        },
      },
    },
    customTitle: {
      '&>div:first-child': {
        '&>p': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 338,
          [theme.breakpoints.down('sm')]: {
            maxWidth: 200,
          },
        },
      },
    },
    containerHomeDrawAway: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  });

export const useStyles = makeStyles(styles);
