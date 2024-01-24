import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      marginTop: 24,
    },
    main: {
      padding: '24px 0px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
    },
    overlayBanner: {
      background: 'rgba(0, 0, 0, 0.6)',
    },
    competitionLogo: {
      height: 36,
      width: 36,
      backgroundSize: 'contain',
    },
    share: {
      position: 'absolute',
      top: 10,
      right: 10,
      cursor: 'pointer',
    },
    wrapper1: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    competitionName: {
      fontSize: 16,
      fontWeight: 500,
      marginLeft: 8,
    },
    deadline: {
      color: '#E53935',
      fontSize: 14,
      marginTop: 12,
      [theme.breakpoints.down('sm')]: {
        marginTop: 4,
      },
    },
    season: {
      fontSize: 20,
      fontWeight: 600,
      marginTop: 8,
    },
    wrapper2Teams: {
      display: 'flex',
      marginTop: 40,
      alignItems: 'center',
    },
    teamLogo: {
      height: 60,
      width: 60,
      backgroundSize: 'contain:',
    },
    teamName: {
      fontSize: 16,
      fontWeight: 600,
      marginTop: 12,
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    wapperScore: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '80px',
      '& p': {
        fontSize: '18px',
        fontWeight: 600,
        color: '#3FADD5',
      },
    },
    wrapperTime: {
      width: 'fit-content',
      margin: '0px 60px',
      flexDirection: 'column',
      [theme.breakpoints.down('md')]: {
        margin: '0px 50px',
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0px 24px',
        '&>p': {
          whiteSpace: 'nowrap',
        },
      },
    },
    hour: {
      fontWeight: 600,
      fontSize: 16,
      width: '100%',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    day: {
      fontSize: 16,
      color: '#BDBDBD',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    odd: {
      width: 70,
      height: 54,
      backgroundColor: '#111111',
      fontSize: 14,
      fontWeight: 500,
    },
    marketType: {
      width: '100%',
      textAlign: 'center',
      marginTop: 12,
      marginBottom: 8,
    },
    wrapperOdd: {
      display: 'flex',
      alignItems: 'end',
    },
    wrapper1Team: {
      width: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        width: 110,
      },
    },
    wrapperNameAndOdd: {
      margin: '0px 85px',
      [theme.breakpoints.down('md')]: {
        margin: '0px 75px',
      },
      [theme.breakpoints.down('sm')]: {
        margin: '0px 39px',
      },
    },
    statistic: {
      padding: '24px 20px',
      backgroundColor: '#1C1C1E',
      marginTop: 12,
    },
    statisticText: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 8,
    },
    wrapperCommission: {
      display: 'flex',
      '&>p:first-child': {
        fontSize: 14,
        color: '#BDBDBD',
      },
      '&>p:last-child': {
        fontSize: 14,
        fontWeight: 500,
        marginLeft: 4,
      },
    },
    changeBtn: {
      position: 'absolute',
      right: 16,
      top: 16,
      [theme.breakpoints.down('sm')]: {
        right: 8,
        top: 8,
      },
    },
    overlay: {
      transition: '.5s ease',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      MsTransform: 'translate(-50%, -50%)',
      textAlign: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      opacity: '0.5',
    },
  });

export const useStyles = makeStyles(styles);
