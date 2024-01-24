import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    wapper: {
      width: '100%',
      background: '#1C1C1E',
      marginBottom: 20,
      marginTop: 10,
      display: 'flex',
      paddingBottom: 16,
      flexDirection: 'column',
      '&>p:first-child': {
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '22px',
        color: '#FFFFFF',
        marginBottom: 20,
      },
    },
    wapperLight: {
      width: '100%',
      background: 'white',
      marginBottom: 20,
      marginTop: 10,
      display: 'flex',
      paddingBottom: 16,
      flexDirection: 'column',
      '&>p:first-child': {
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '22px',
        color: '#FFFFFF',
        marginBottom: 20,
      },
      '& p': {
        color: '#1c1c1e !important',
      },
    },
    haveScoreTeam: {
      flexDirection: 'column',
    },
    commonInput: {
      height: 30,
      width: 115,
      marginTop: 14,
      backgroundColor: '#4B4B4B',
      [theme.breakpoints.down('sm')]: {
        width: 96,
      },
      '& input': {
        color: 'white',
      },
    },
    totalScore: {
      marginTop: 14,
      marginRight: 8,
    },
    inputOne: {
      marginRight: 147,
      [theme.breakpoints.down('sm')]: {
        marginRight: 129,
      },
    },
    wrapperChoice: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: 16,
      alignItems: 'center',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    wapperHeader: {
      width: '100%',
      display: 'flex',
      '& p': {
        color: '#BDBDBD',
        fontSize: 14,
      },
    },
    wapperOptions: {
      display: 'flex',
      width: '100%',
      paddingTop: 4,
      '&>div:first-child': {
        position: 'relative',
      },
      '&>div:not(:last-child)': {
        marginRight: 10,
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '& button': {
        top: '20px',
      },
    },
    homeDrawAwayWrapper: {
      '&>div:first-child': {
        width: '100%',
        marginRight: 0,
      },
      // '&>div>div': {
      //   width: 94,
      // },
    },
    overUnderOption: {
      marginTop: 8,
      flexDirection: 'column',
      '&>div:not(:last-child)': {
        marginRight: 0,
      },
      '&>div:first-child': {
        background: '#2C2C2F',
      },
      '&>div': {
        padding: 2,
      },
    },
    overUnderOptionLight: {
      marginTop: 8,
      flexDirection: 'column',
      '&>div:not(:last-child)': {
        marginRight: 0,
      },
      '&>div:first-child': {
        background: 'white !important',
      },
      '&>div': {
        padding: 2,
      },
    },
    wrapperHeader: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    shareButton: {
      borderRadius: 20,
      marginLeft: 20,
      width: 80,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      background: '#C6EBFC',
      '& p': {
        color: '#1976D2',
        fontSize: 14,
        marginLeft: 4,
      },
      '& svg': {
        width: 12,
        height: 12,
      },
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        height: 16,
        width: 16,
        marginRight: 8,
      },
    },
    centerItem: {
      alignItems: 'center',
    },
  });

export const useStyles = makeStyles(styles);
