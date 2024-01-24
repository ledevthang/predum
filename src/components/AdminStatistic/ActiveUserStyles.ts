import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      border: '1px solid white',
      padding: 24,
      marginTop: 32,
    },
    wrapperTotal: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 16,
      '&>p:first-child': {
        fontWeight: 500,
        fontSize: 24,
        marginRight: 4,
      },
      '&>p:last-child': {
        fontSize: 24,
      },
    },
    chart: {
      width: 250,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    nameChart: {
      fontSize: 24,
      fontWeight: 600,
      marginTop: 16,
    },
    detail: {
      fontSize: 16,
    },
  });
export const useStyles = makeStyles(styles);
