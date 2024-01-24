import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#333333',
      padding: 16,
      flexDirection: 'column',
      width: 480,
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        width: 'fit-content',
      },
    },
    shareMatch: {
      fontSize: 18,
      fontWeight: 600,
    },
    description: {
      fontSize: 14,
      marginTop: 20,
      marginBottom: 12,
    },
    shareBox: {
      backgroundColor: '#4B4B4B',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 14px',
      width: '100%',
      marginBottom: 26,
      '& svg': {
        fill: 'none',
      },
    },
    italic: {
      fontStyle: 'italic',
      fontSize: 13,
      position: 'absolute',
      top: 144,
      marginBottom: 12,
    },
    wapperIcon: {
      '& svg': {
        height: 36,
        width: 36,
      },
    },
  });

export const useStyles = makeStyles(styles);
