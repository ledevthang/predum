import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '24px 0px',
      width: '100%',
    },
    wrapperFixtureDetail: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '0px 40px',
      '&>p': {
        color: '#BDBDBD',
        fontSize: 14,
      },
      '&>p:first-child': {
        fontSize: 16,
        fontWeight: 600,
        color: 'white',
        whiteSpace: 'pre',
      },
    },
    logo: {
      width: 80,
      height: 80,
      [theme.breakpoints.down('sm')]: {
        width: 64,
        height: 64,
      },
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 10,
      },
    },
    loadMore: {
      padding: '0px 24px !important',
      height: 44,
      color: '#3FADD5',
      borderRadius: 22,
      border: '1px solid #3FADD5',
    },
    wapperLogo: {
      display: 'flex',
      alignItems: 'center',
      '&>p': {
        fontSize: 16,
        fontWeight: 600,
        margin: '0px 20px',
      },
    },
    wapperScoreGroup: {
      display: 'flex',
      '&>p': {
        fontSize: 16,
        fontWeight: 600,
        color: '#3FADD5',
        padding: '0px 5px',
      },
    },
  });

export const useStyles = makeStyles(styles);
