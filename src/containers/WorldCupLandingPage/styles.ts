import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {},
    banner: {
      width: '100%',
      height: 240,
    },
  });

export const useStyles = makeStyles(styles);
