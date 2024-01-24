import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: 24,
      backgroundColor: '#1C1C1E',
      marginTop: 24,
      [theme.breakpoints.down('sm')]: {
        padding: 12,
      },
    },
    question: {
      fontSize: 14,
      fontWeight: 500,
    },
    wrapperChoice: {
      display: 'flex',
      overflowX: 'auto',
      width: '100%',
      flexWrap: 'wrap',
      '&>div': {
        marginTop: 12,
        marginRight: 10,
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 8,
      },
    },
    choice: {
      backgroundColor: theme.colors.black2,
      width: 96,
      height: 54,
      flexDirection: 'column',
      padding: '0px 16px',
      boxSizing: 'content-box',
      '& p': {
        width: 'inherit',
        fontSize: 14,
        textAlign: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
          fontSize: 12,
        },
      },
      [theme.breakpoints.down('sm')]: {
        width: 75,
      },
    },
    choiceOverUnderUvU: {
      backgroundColor: theme.colors.black2,
      width: 128,
      height: 54,
      '& p': {
        fontSize: 14,
        textAlign: 'center',
        marginLeft: 8,
        [theme.breakpoints.down('sm')]: {
          fontSize: 12,
        },
      },
    },
    handicap: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 10,
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
    overUnderName: {
      flexGrow: 1,
      marginLeft: 16,
    },
    overUnderValue: {
      width: '13%',
      [theme.breakpoints.down('sm')]: {
        width: 40,
      },
    },
    choiceHomeDrawAway: {
      [theme.breakpoints.down('sm')]: {
        width: 100,
      },
    },
    wrapperOverUnder: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '&>div': {
        height: 44,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        '&>p:not(:first-child)': {
          fontSize: 14,
          color: '#BDBDBD',
        },
      },
      '&>div:first-child': {
        backgroundColor: '#4B4B4B',
      },
      '&>div:not(:first-child)': {
        '&>p:not(:first-child)': {
          fontSize: 14,
          fontWeight: 600,
          color: 'white',
        },
      },
    },
    marketType: {
      margin: '12px 0px',
      fontSize: 14,
      color: '#BDBDBD',
    },
  });

export const useStyles = makeStyles(styles);
