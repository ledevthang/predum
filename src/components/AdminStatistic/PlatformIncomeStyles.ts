import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '49%',
      border: '1px solid white',
      padding: 16,
    },
    name: {
      fontSize: 32,
      fontWeight: 600,
      marginBottom: 24,
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '6px 0px',
    },
    border: {
      borderBottom: '1px solid white',
    },
    type: {
      fontWeight: 500,
      fontSize: 18,
    },
    wrapperToken: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      '&>p': {
        marginBottom: 8,
        fontSize: 16,
      },
    },
  });
export const useStyles = makeStyles(styles);
