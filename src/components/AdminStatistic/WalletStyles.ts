import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '49%',
      border: '1px solid white',
      padding: 16,
      height: 'fit-content',
    },
    name: {
      fontSize: 32,
      fontWeight: 600,
      marginBottom: 24,
    },
    wrapperCount: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '&>p:first-child': {
        fontWeight: 500,
        fontSize: 18,
      },
      '&>p:last-child': {
        fontSize: 16,
      },
    },
  });
export const useStyles = makeStyles(styles);
