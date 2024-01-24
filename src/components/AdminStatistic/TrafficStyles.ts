import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: '49%',
      border: '1px solid white',
      height: 100,
    },
  });
export const useStyles = makeStyles(styles);
