import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      background: '#1C1C1E',
      borderRadius: 2,
      padding: 12,
      cursor: 'pointer',
    },
    containerDetail: {
      width: 375,
      background: '#1C1C1E',
      borderRadius: 2,
      padding: 12,
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        width: 358,
      },
    },
    pin: {
      position: 'absolute',
      right: 8,
      top: 0,
      cursor: 'pointer',
      '& svg': {
        width: 13,
        height: 13,
      },
    },
    category: {
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
    eventName: {
      fontSize: 18,
      fontWeight: 500,
    },
    tooltip: {
      fontSize: '14px',
      backgroundColor: '#111111',
      width: '500px',
    },
    host: {
      '& svg': {
        width: 12,
        height: 12,
        marginRight: 4,
      },
      '& p': {
        fontWeight: 400,
        fontSize: 14,
      },
      display: 'flex',
      alignItems: 'center',
    },
    inputStatus: {
      marginBottom: 8,
      border: '1px dashed #BDBDBD',
      display: 'flex',
      padding: 3,
      justifyContent: 'center',
      '&>p': {
        fontWeight: 600,
        color: '#BDBDBD',
        padding: '7px 0px',
      },
    },
    eventInfo: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    highlightText: {
      fontWeight: 600,
      fontSize: 14,
      color: '#3FADD5',
    },
    wrapperTime: {
      display: 'flex',
      marginTop: 4,
      '& svg': {
        width: 20,
        marginRight: 4,
      },
    },
    views: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 4,
      '& p': {
        fontSize: 14,
      },
      '& svg': {
        width: 14,
        marginRight: 4,
      },
    },
  });

export const useStyles = makeStyles(styles);
