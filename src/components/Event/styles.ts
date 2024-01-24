import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {},
    listProEvent: {
      padding: '0px 35px 0px 225px',
      marginBottom: 24,
      [theme.breakpoints.down('md')]: {
        padding: '0px 20px 0px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 0px 0px 0px',
      },
    },
    noContent: {
      display: 'flex',
      justifyContent: 'center',
      margin: '20px 0px',
      '&>p': {
        fontSize: 18,
        fontWeight: 500,
      },
    },
    wrapperMatches: {
      display: 'grid',
      width: '100%',
      paddingBottom: 24,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: '20px 12px',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      },
      [theme.breakpoints.up('xl')]: {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      },
    },
  });

export const useStyles = makeStyles(styles);
