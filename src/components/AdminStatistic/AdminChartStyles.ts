import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '49%',
      border: '1px solid white',
      padding: 24,
    },
    chart: {
      width: 250,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    label: {
      fontSize: 24,
      fontWeight: 600,
      marginTop: 16,
    },
    wrapperTotal: {
      display: 'flex',
      alignItems: 'center',
      '&>p:first-child': {
        fontSize: 16,
        fontWeight: 600,
        marginRight: 4,
      },
      '&>p:last-child': {
        fontSize: 14,
      },
    },
    wrapperDetail: {},
    detail: {
      fontSize: 16,
    },
    dot: {
      fontSize: 9,
      marginTop: 8,
      marginRight: 6,
    },
  });
export const useStyles = makeStyles(styles);
