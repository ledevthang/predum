import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {},
    league: {
      fontSize: 20,
      fontWeight: 500,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 10,
      },
    },
    wrapperFilter: {
      position: 'relative',
    },
    filter: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  });

export const useStyles = makeStyles(styles);
