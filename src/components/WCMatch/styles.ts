import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      background: '#1C1C1E',
      marginBottom: 40,
      marginTop: 24,
    },
    wrapper: {
      padding: 20,
    },
    wrapperScroller: {
      height: 520,
      overflowY: 'scroll',
      width: '100%',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    wrapperMatches: {
      display: 'grid',
      padding: 20,
      width: '100%',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '24px 20px',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      },
    },
  });

export const useStyles = makeStyles(styles);
