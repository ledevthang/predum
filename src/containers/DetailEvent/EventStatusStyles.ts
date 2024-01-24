import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    wapperStatus: {
      marginTop: 18,
    },
    wapperStatusPro: {
      paddingTop: 20,
      paddingLeft: 16,
      paddingBottom: 10,
      borderTop: '1px solid gray',
    },
    wapperStatusProWidget: {
      paddingTop: 20,
      paddingLeft: 16,
      paddingBottom: 10,
      // borderTop: '1px solid gray',
      // [theme.breakpoints.down('md')]: {
      //   width: 'calc(100% - 40px)',
      // },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingTop: 0,
        paddingLeft: 0,
        paddingBottom: 0,
      },
    },
    wapperDeadline: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&>p:first-child': {
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '29px',
        color: '#FFFFFF',
        marginBottom: 12,
      },
      '& svg': {
        height: 12,
        width: 12,
        marginBottom: 12,
        marginLeft: 4,
      },
    },
    fDrection: {
      flexDirection: 'column',
    },
    report: {
      marginTop: 8,
      '& svg': {
        width: 16,
        height: 16,
        marginRight: 4,
        marginBottom: 0,
      },
    },
    typoHistory: {
      marginLeft: 4,
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  });

export const useStyles = makeStyles(styles);
