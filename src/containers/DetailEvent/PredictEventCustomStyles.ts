import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    wapper: {
      width: '100%',
      background: '#1C1C1E',
      padding: 24,
      marginBottom: 20,
      marginTop: 10,
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        padding: '40px 16px 16px 16px',
      },
    },
    wapperWidget: {
      margin: 0,
    },
    haveScoreTeam: {
      flexDirection: 'column',
    },
    description: {
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '24px',
      color: '#FFFFFF',
      marginBottom: 16,
    },
    overUnderOptionP2P: {
      marginTop: 8,
      flexDirection: 'unset',
      '&>div:not(:last-child)': {
        marginRight: 8,
      },
      '&>div': {
        padding: 2,
      },
    },
    commonInput: {
      height: 30,
      width: 115,
      marginTop: 14,
      backgroundColor: '#4B4B4B',
      '& input': {
        color: 'white',
      },
    },
    price: {
      marginTop: 14,
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        height: 16,
        width: 16,
        marginRight: 8,
      },
      '& p': {
        color: '#BDBDBD',
      },
    },
    wrapperHeader: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
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
    inputOneHandicap: {
      marginRight: 88,
    },
    inputImage: {
      width: 128,
    },
    wrapperChoice: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      borderBottom: '1px solid gray',
      paddingBottom: 24,
      '& svg': {
        height: 16,
        width: 16,
        marginRight: 4,
      },
      '&>div:not(:last-child)': {
        marginRight: 10,
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '&>p:first-child': {
        color: '#BDBDBD',
        fontSize: 14,
      },
    },
    wapperOptions: {
      display: 'flex',
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
    overUnderOption: {
      marginTop: 8,
      flexDirection: 'column',
      '&>div:not(:last-child)': {
        marginRight: 0,
      },
      '&>div:first-child': {
        background: '#4B4B4B',
      },
      '&>div': {
        padding: 2,
      },
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
      [theme.breakpoints.down('sm')]: {
        width: 40,
        '& svg': {
          width: 16,
          height: 16,
        },
      },
    },
  });

export const useStyles = makeStyles(styles);
