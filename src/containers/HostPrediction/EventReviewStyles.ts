import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#1C1C1E',
      padding: 20,
      display: 'flex',
      justifyContent: 'space-between',
      '&>div:first-child': {
        flexGrow: 1,
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    right: {
      width: 260,
      marginTop: 20,
      marginBottom: 4,
      borderLeft: '1px solid #5A5A5E',
      padding: 20,
      [theme.breakpoints.down('md')]: {
        width: 200,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        borderTop: '1px solid #5A5A5E',
        borderLeft: 'none',
        padding: '24px 0px',
      },
    },
    category: {
      backgroundColor: '#2C2C2F',
      width: '100%',
      display: 'flex',
      height: 40,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0px 20px',
      marginTop: 24,
      '&>p': {
        fontSize: 16,
        color: '#BDBDBD',
        [theme.breakpoints.down('sm')]: {
          fontSize: 14,
        },
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 12,
      },
    },
    category2: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 4,
      '& svg': {
        marginRight: 6,
        width: 14,
        height: 14,
      },
      '& p': {
        fontSize: 14,
        color: '#BDBDBD',
        [theme.breakpoints.down('sm')]: {
          fontSize: 13,
        },
      },
    },
    hostBy: {
      width: 'fit-content',
      fontSize: 14,
      '& svg': {
        marginRight: 6,
        height: 20,
        width: 20,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        '& svg': {
          marginRight: 4,
          height: 16,
          width: 16,
        },
      },
    },
    name: {
      fontSize: 18,
      fontWeight: 600,
      [theme.breakpoints.down('md')]: {
        fontSize: 16,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    short: {
      color: '#BDBDBD',
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    eventType: {
      fontSize: 14,
      marginTop: 16,
      color: '#BDBDBD',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
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
    deadline: {
      marginTop: 12,
      display: 'flex',
      flexFlow: 'row wrap',
      [theme.breakpoints.down('md')]: {
        marginTop: 12,
      },
    },
    deadlineItem: {
      display: 'flex',
      marginRight: 24,
      '& p': {
        fontSize: 14,
        lineHeight: '17px',
        [theme.breakpoints.down('sm')]: {
          fontSize: 13,
        },
      },
      '&>p:first-child': {
        color: '#BDBDBD',
        marginRight: 2,
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: 16,
      },
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
    statistic: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 24,
    },
    wrapper: {
      display: 'flex',
      marginBottom: 16,
      '&>p:first-child': {
        color: '#BDBDBD',
        fontSize: 14,
      },
      '&>p:last-child': {
        fontSize: 14,
        fontWeight: 600,
        marginLeft: 4,
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
    wrapperPoolReview: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 16,
      [theme.breakpoints.down('sm')]: {
        alignItems: 'baseline',
      },
    },
    liquidityPool: {
      marginLeft: 4,
      color: '#3FADD5',
      fontWeight: 600,
      fontSize: 14,
    },
    labelPool: {
      fontSize: 14,
      color: '#BDBDBD',
    },
    wrapperLiquidityMobile: {
      marginLeft: 4,
      '&>p': {
        color: '#3FADD5',
        fontWeight: 600,
        fontSize: 13,
      },
    },
  });

export const useStyles = makeStyles(styles);
