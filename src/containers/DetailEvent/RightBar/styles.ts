import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      position: 'fixed',
      top: 82,
      right: 60,
      zIndex: 3,
      width: 260,
      height: 'calc(100vh - 100px)',
      overflowY: 'scroll',
      overflow: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      [theme.breakpoints.down('md')]: {
        position: 'initial',
      },
    },
    wrapper: {
      width: '100%',
      background: '#1C1C1E',
      marginBottom: 24,
      padding: 16,
      [theme.breakpoints.down('md')]: {
        marginBottom: 16,
      },
    },
    wrapperPool: {
      width: '100%',
    },
    poolHeader: {
      background: '#333333',
      padding: '8px 16px',
      display: 'flex',
      '&>p': {
        fontSize: 20,
        fontWeight: 600,
      },
      '& svg': {
        marginLeft: 6,
        height: 18,
        width: 18,
      },
      [theme.breakpoints.down('md')]: {
        background: 'linear-gradient(180deg, #0B0B0E 0%, #1C1C1E 100%)',
        justifyContent: 'center',
        padding: '16px 16px 0px 16px',
      },
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
    },
    highlightText: {
      color: '#3FADD5',
      fontWeight: 600,
      fontSize: 24,
    },
    infoText: {
      color: '#BDBDBD',
      fontSize: 14,
    },
    poolContent: {
      background: '#1C1C1E',
      padding: '24px 16px',
      [theme.breakpoints.down('md')]: {
        height: 185,
        padding: '4px 16px',
      },
      [theme.breakpoints.down('sm')]: {
        height: 'unset',
        paddingBottom: 12,
      },
    },
    hostName: {
      '& p': {
        fontWeight: 600,
        fontSize: 16,
        marginRight: 4,
      },
      '& svg': {
        width: 20,
        height: 20,
      },
    },
    follow: {
      fontSize: 14,
    },
    wrapperButton: {
      marginTop: 12,
      '&>button': {
        padding: '4px 14px !important',
        borderRadius: 30,

        '& svg': {
          fill: 'none',
          width: 18,
          marginRight: 2,
        },
      },
      '&>button:first-child': {
        marginRight: 12,
        background: '#C6EBFC',
        '& span': {
          color: '#1976D2',
        },
      },
      '&>button:last-child': {
        background: '#FEF3D9',
        '& span': {
          color: 'black',
        },
      },
    },
    warningText: {
      marginLeft: 0,
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
      marginTop: 12,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 16,
        marginRight: 24,
      },
    },
    timeWapper: {
      marginTop: 12,
      marginBottom: 4,
    },
    timeline: {
      display: 'flex',
      marginBottom: 4,
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
    wrapperComment: {
      marginTop: 24,
    },
    commentHeader: {
      padding: '8px 16px',
      background: '#333333',
      '& p': {
        fontWeight: 600,
        fontSize: 20,
        textAlign: 'center',
      },
      [theme.breakpoints.down('md')]: {
        background: 'linear-gradient(180deg, #0B0B0E 0%, #1C1C1E 100%)',
        padding: '16px',
      },
    },
    test: {
      height: 'calc(100vh - 200px)',
    },
    commentZone: {
      background: '#1C1C1E',
      padding: 16,
    },
    input: {
      border: '1px solid #616161',
      padding: '14px 0px 14px 4px',
      '&>div:first-child': {
        width: 'calc(100% - 75px)',
      },
    },
    buttonPublish: {
      background: 'white',
      borderRadius: 2,
      position: 'absolute',
      right: 8,
      top: 8,
      color: 'black',
      '& span': {
        padding: '4px 8px',
      },
    },
    wrapperHistory: {},
    historyItem: {
      display: 'flex',
      padding: '12px 0px',
    },
    boldText: {
      fontWeight: 600,
    },
    pagination: {
      marginTop: 12,
      '& .MuiPaginationItem-outlined': {
        border: '1px solid #616161',
      },
      '& .MuiPaginationItem-page.Mui-selected': {
        border: '1px solid #3FADD5',
      },
      '& .MuiPaginationItem-root': {
        minWidth: 24,
        height: 26,
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 24,
      },
    },
    coin: {
      width: 20,
      height: 20,
      margin: '0px 4px',
    },
  });

export const useStyles = makeStyles(styles);
