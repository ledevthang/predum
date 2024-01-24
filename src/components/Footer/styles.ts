import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      backgroundColor: '#111111',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 5,
      borderTop: '1px solid #333333',
      padding: '24px 0px',
    },
    text: {
      fontSize: 14,
      color: '#BDBDBD',
      marginTop: 10,
      width: 900,
      [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: '0px 24px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 16px',
      },
    },
  });

export const useStyles = makeStyles(styles);
