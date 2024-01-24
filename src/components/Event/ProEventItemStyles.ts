import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container1: {
      // marginBottom: 36,
    },
    container: {
      backgroundColor: '#1C1C1E',
    },
    header: {
      backgroundColor: '#2C2C2F',
      padding: '10px 64px 10px 20px',
      display: 'flex',
    },
    competitionLogo: {
      width: 20,
      height: 20,
    },
    competitionName: {
      fontSize: 16,
      color: '#BDBDBD',
      marginLeft: 8,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    wrapperHeader: {
      display: 'flex',
      width: 324,
      [theme.breakpoints.down('md')]: {
        width: 'unset',
      },
    },
    wrapperHeader2: {
      '&>div': {
        padding: '0px 36px',
        justifyContent: 'space-between',
        display: 'flex',
        width: 306,
        '&>p': {
          fontSize: 14,
          width: 54,
          textAlign: 'center',
        },
        [theme.breakpoints.down('md')]: {
          padding: '0px 24px',
          width: 258,
        },
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      },
      '&>p': {
        textAlign: 'center',
        width: 100,
        fontSize: 14,
        marginRight: 0,
        [theme.breakpoints.down('md')]: {
          width: 76,
        },
      },
      display: 'flex',
      marginLeft: 'auto',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 'unset',
        marginTop: 24,
      },
    },
    wrapperHeaderOverUnder: {
      '&>div': {
        justifyContent: 'center',
      },
    },
    wrapperHeaderHandicap: {
      marginRight: 128,
      fontSize: 14,
      display: 'flex',
      justifyContent: 'flex-end',
      flexGrow: 1,
      [theme.breakpoints.down('md')]: {
        marginRight: 106,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 24,
        marginRight: 0,
        justifyContent: 'center',
      },
    },
    main: {
      display: 'flex',
      margin: '0px 20px',
      padding: '12px 0px',
      borderBottom: '1px #5A5A5E solid',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: 0,
      },
    },
    marginLeftHandicapMobile: {
      [theme.breakpoints.down('sm')]: {
        // marginLeft: 60,
      },
    },
    live: {
      backgroundColor: '#E53935',
      width: 64,
      height: 24,
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 700,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    teamLogo: {
      height: 24,
      width: 24,
    },
    wrapperTeams: {
      display: 'flex',
      padding: '12px 0px',
      width: 324,
      cursor: 'pointer',
      alignItems: 'center',
      '&>div:last-child': {
        marginLeft: 24,
        '&>p': {
          fontSize: 20,
          fontWeight: 600,
          marginLeft: 32,
          [theme.breakpoints.down('sm')]: {
            fontSize: 16,
          },
        },
      },
      [theme.breakpoints.down('md')]: {
        width: 'unset',
      },
      [theme.breakpoints.down('sm')]: {
        borderBottom: '1px solid #5A5A5E',
        padding: '20px 0px',
      },
    },
    wrapperTeam: {
      display: 'flex',
      alignItems: 'center',
      '&>p': {
        fontSize: 20,
        lineHeight: '24px',
        fontWeight: 600,
        marginLeft: 8,
        [theme.breakpoints.down('sm')]: {
          fontSize: 16,
        },
      },
    },
    footer: {
      padding: '24px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    wrapperMain: {
      marginLeft: 'auto',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 'unset',
      },
    },
    score: {
      width: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px 0px',
      borderRight: '1px #5A5A5E solid',
      '&>p': {
        fontSize: 14,
        height: 30,
        display: 'flex',
        alignItems: 'center',
      },
      [theme.breakpoints.down('md')]: {
        width: 76,
      },
    },
    odd: {
      width: 306,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 36px',
      alignItems: 'center',
      height: 'fit-content',
      [theme.breakpoints.down('md')]: {
        width: 258,
        padding: '12px 24px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        borderLeft: 'none',
      },
    },
    oddOverUnder: {
      padding: '12px 40px',
      marginTop: 4,
      [theme.breakpoints.down('md')]: {
        padding: '12px 28px',
      },
    },
    oddBox: {
      width: 54,
      height: 54,
      backgroundColor: '#111111',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 14,
      cursor: 'pointer',
    },
    actived: {
      color: '#3FADD5',
      border: '1px solid #3FADD5',
    },
    disabledOption: {
      color: '#666666',
      cursor: 'unset',
    },
    totalBox: {
      backgroundColor: '#1C1C1E',
    },
    handicap: {
      fontSize: 20,
      fontWeight: 600,
    },
    btn: {
      [theme.breakpoints.up('md')]: {
        width: 44,
        borderLeft: '1px #5A5A5A solid',
        justifyContent: 'flex-end',
        '&>span': {
          transform: 'rotate(-90deg)',
          width: 24,
          '&>svg': {
            marginTop: 8,
          },
        },
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 20,
      },
    },
    wrapperFooter1: {
      [theme.breakpoints.down('sm')]: {
        marginBottom: 4,
      },
    },
    customFooter: {
      display: 'flex',
      '&>p': {
        fontSize: '18px',
        lineHeight: '22px',
        fontWeight: 600,
        color: '#3FADD5',
      },
      '&>p:first-child': {
        color: '#BDBDBD',
        fontWeight: 400,
        marginRight: 4,
      },
    },
    wrapperFooter2: {
      alignSelf: 'flex-start',
      '&>div': {
        display: 'flex',
        alignItems: 'center',
        '&>svg': {
          width: 16,
          height: 16,
          marginRight: 8,
          marginTop: 2,
        },
        [theme.breakpoints.down('sm')]: {
          marginTop: 8,
        },
      },
    },
    oddChecker: {
      fontWeight: 600,
      marginLeft: 4,
    },
    otherBtn: {
      fontSize: 14,
      color: '#BDBDBD',
      marginTop: 8,
      '& svg': {
        width: 10,
        height: 10,
        marginLeft: 4,
        marginTop: 2,
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: 16,
      },
    },
    wrapperOverUnder: {
      backgroundColor: '#2C2C2F',
      padding: '12px 20px',
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      '&>p': {
        fontSize: 14,
      },
    },
    wrapperBody: {
      '&>div:not(:last-child)': {
        borderBottom: '1px solid #A5A5A5',
      },
    },
  });

export const useStyles = makeStyles(styles);
