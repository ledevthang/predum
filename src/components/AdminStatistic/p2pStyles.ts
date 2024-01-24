import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: 32,
      display: 'flex',
      justifyContent: 'space-between',
    },
    summary: {
      border: '1px solid white',
      borderRadius: 2,
      width: '49%',
      padding: 16,
    },
    wrapperDetail: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
      '&>p:first-child': {
        fontSize: 16,
        fontWeight: 500,
      },
    },
    wrapperDetail2: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
      marginLeft: 24,
      '&>p:first-child': {
        fontSize: 16,
      },
    },
  });
export const useStyles = makeStyles(styles);
