import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      flexDirection: 'column',
    },
    mainText: {
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: '32px',
    },
    noteText: {
      fontSize: '14px',
      lineHeight: '16px',
      textTransform: 'uppercase',
      margin: '4px 0px 8px 0px',
      color: '#BDBDBD',
    },
    closeText: {
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '20px',
      color: '#E53935',
    },
    wapperCard: {
      marginTop: 20,
      width: '100%',
    },
  });

export const useStyles = makeStyles(styles);
