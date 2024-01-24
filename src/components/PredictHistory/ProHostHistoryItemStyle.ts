import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#1C1C1E',
      height: 220,
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        height: 320,
      },
    },
    titleWapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      borderBottom: '1px solid #5A5A5E',
      marginTop: 10,
      paddingRight: 10,
      [theme.breakpoints.down('md')]: {
        marginTop: 6,
      },
      [theme.breakpoints.down('sm')]: {
        borderRight: 'none',
        marginTop: 0,
        width: '100%',
      },
    },
    statisticsWapper: {
      marginTop: 16,
      display: 'flex',
    },
    statisticsInfo: {
      width: '60%',
      '& p:first-child': {
        fontWeight: 600,
        fontSize: '18px',
        lineHeight: '22px',
        color: '#FFFFFF',
      },
    },
    inforContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    infor: {
      display: 'flex',
      '& p:first-child': {
        color: '#BDBDBD',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '17px',
        marginRight: 4,
      },
      '& p': {
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#FFFFFF',
      },
      marginTop: 4,
      marginBotton: 4,
    },
    inforWapper: {
      marginTop: 5,
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
      },
    },
    commission: {
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-end',
      },
      '& p': {
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '24px',
      },
      '& p:first-child': {
        fontSize: '14px',
        lineHeight: '17px',
      },
    },
  });

export const useStyles = makeStyles(styles);
